const {
  getProduct,
  getProductCount,
  getProductCountByName,
  getProductById,
  getProductByName,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("../model/product");
const qs = require("querystring");
const fs = require('fs')
const helper = require("../helper/index");
const redis = require('redis')
const client = redis.createClient()

const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1,
    };
    const resultPrevLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultPrevLink);
  } else {
    return null;
  }
};

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1,
    };
    const resultNextLink = { ...currentQuery, ...generatedPage };
    return qs.stringify(resultNextLink);
  } else {
    return null;
  }
};

module.exports = {
  getProduct: async (request, response) => {
    let { page, limit, sort } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);
    // page === undefined || page === '' ? page = 1 : parseInt(page)
    // limit === undefined || page === '' ? limit = 3 : parseInt(limit)
    // if (sort === undefined || sort === '') {
    //     sort = 'product_id'
    // }
    const totalData = await getProductCount();
    const totalPage = Math.ceil(totalData / limit);
    const offset = page * limit - limit;
    const prevLink = getPrevLink(page, request.query);
    const nextLink = getNextLink(page, totalPage, request.query);
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`,
    };
    try {
      const result = await getProduct(limit, offset, sort);
      const newResult = {
        result,
        pageInfo
      }
      client.setex(`getproduct:${JSON.stringify(request.query)}`, 3600, JSON.stringify(newResult))
      //proses set data result ke dalam redis
      return helper.response(
        response,
        200,
        "Success Get Product",
        result,
        pageInfo
      );
    } catch (error) {
      // console.log(error);
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  getProductByName: async (request, response) => {
    const { keyword } = request.query;
    const resultData = await getProductCountByName(keyword);
    try {
      const searchResult = await getProductByName(keyword);
      const result = {
        resultData,
        searchResult,
      };
      client.set(`getproductbyname:${keyword}`, JSON.stringify(result))
      if (searchResult.length > 0) {
        return helper.response(
          response,
          201,
          "Success Get Product By Name",
          result
        );
      } else {
        return helper.response(response, 404, `Product Not Found`, result);
      }
      // console.log(result)
    } catch (error) {
      //   return helper.response(response, 400, "Bad Request", error);
      console.log(error);
    }
  },
  getProductById: async (request, response) => {
    try {
      // const id = request.params.id
      const { id } = request.params;
      const result = await getProductById(id);
      client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result))
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          "Success Get Product By ID",
          result
        );
      } else {
        return helper.response(
          response,
          404,
          `Product By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        category_id,
        product_name,
        product_price,
        product_status,
      } = request.body;
      const setData = {
        category_id,
        product_name,
        product_price,
        product_image: request.file === undefined ? "" : request.file.filename,
        product_created_at: new Date(),
        product_status,
      };
      // console.log(setData)
      if (setData.category_id === "") {
        return helper.response(response, 400, "Please select category");
      } else if (setData.product_image === "") {
        return helper.response(response, 400, "Please select image");
      } else if (setData.product_name === "") {
        return helper.response(response, 400, "Product name cannot be empty");
      } else if (setData.product_price === "") {
        return helper.response(response, 400, "Product price cannot be empty");
      } else if (setData.product_status === "") {
        return helper.response(response, 400, "Please select status");
      } else {
        const result = await postProduct(setData);
        return helper.response(response, 201, "New product has been added", result);
      }
    } catch (error) {
      // console.log(error);
      return helper.response(response, 400, "Bad Request", error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        category_id,
        product_name,
        product_price,
        product_image,
        product_status,
      } = request.body;
      const setData = {
        category_id,
        product_name,
        product_price,
        product_image: request.file === undefined ? "" : request.file.filename,
        product_updated_at: new Date(),
        product_status,
      };
      if (category_id === "") {
        return helper.response(response, 400, "Category ID cannot be empty");
      }
      if (product_name === "") {
        return helper.response(response, 400, "Product name cannot be empty");
      }
      if (product_price === "") {
        return helper.response(response, 400, "Product price cannot be empty");
      }
      if (product_image === "") {
        return helper.response(response, 400, "Product image cannot be empty");
      }
      if (product_status === "") {
        return helper.response(response, 400, "Product status cannot be empty");
      }
      const checkId = await getProductById(id);
      if (checkId.length > 0) {
        fs.unlink(`./uploads/${checkId[0].product_image}`, async (error) => {
          if (error) {
            throw error;
          } else {
            const result = await patchProduct(setData, id);
            return helper.response(response, 201, "Product Updated", result);
          }
        });
      } else {
        return helper.response(
          response,
          404,
          `Product By Id : ${id} Not Found`
        );
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await getProductById(id)
      fs.unlink(`./uploads/${checkId[0].product_image}`, async (error) => {
        if (error) {
          throw error;
        } else {
          const result = await deleteProduct(id);
          return helper.response(response, 201, "Product Deleted", result);
        }
      });
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
};
