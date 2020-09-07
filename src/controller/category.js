const { getAllCategory, getCategoryCount, getCategoryCountByName, getCategoryByName, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../model/category')
const helper = require('../helper/index')
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
    getAllCategory: async (request, response) => {
        let { page, limit, sort } = request.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const totalData = await getCategoryCount();
        const totalPage = Math.ceil(totalData / limit);
        const offset = page * limit - limit;
        const prevLink = getPrevLink(page, request.query);
        const nextLink = getNextLink(page, totalPage, request.query);
        const pageInfo = {
            page,
            totalPage,
            limit,
            totalData,
            prevLink: prevLink && `http://127.0.0.1:3001/category?${prevLink}`,
            nextLink: nextLink && `http://127.0.0.1:3001/category?${nextLink}`,
        };
        try {
            const result = await getAllCategory(limit, offset, sort);
            const newResult = {
                result,
                pageInfo
            }
            client.set('getallcategory', JSON.stringify(newResult))
            return helper.response(response, 200, 'Success Get Category', result, pageInfo)
        } catch (error) {
            return helper.response(response, 404, 'Bad Request', error)
        }
    },
    getCategroyByName: async (request, response) => {
        const { keyword } = request.query;
        const resultData = await getCategoryCountByName(keyword);
        try {
            const searchResult = await getCategoryByName(keyword);
            const result = {
                resultData,
                searchResult,
            };
            if (searchResult.length > 0) {
                client.setex(`getcategorybyname:${keyword}`, 3600, JSON.stringify(result))
                return helper.response(
                    response,
                    201,
                    "Success Get Category By Name",
                    result
                );
            } else {
                return helper.response(response, 404, `Product Not Found`, result);
            }
        } catch (error) {
            console.log(error);
        }
    },
    getCategoryById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getCategoryById(id);
            if (result.length > 0) {
                client.setex(`getcategorybyid:${id}`, 3600, JSON.stringify(result))
                return helper.response(response, 200, 'Success Get Category By ID', result)
            } else {
                return helper.response(response, 404, `Category By Id : ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    postCategory: async (request, response) => {
        try {
            const setData = {
                category_name: request.body.category_name,
                category_created_at: new Date()
            }
            const result = await postCategory(setData)
            return helper.response(response, 201, 'Category Created', result)
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    patchCategory: async (request, response) => {
        try {
            const { id } = request.params
            const setData = {
                category_name: request.body.category_name,
                category_updated_at: new Date()
            }
            const checkId = await getCategoryById(id)
            if (checkId.length > 0) {
                const result = await patchCategory(setData, id)
                return helper.response(response, 201, 'Category Updated', result)
            } else {
                return helper.response(response, 404, `Category By Id : ${id} Not Found`, error)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    deleteCategory: async (request, response) => {
        try {
            const { id } = request.params
            const result = await deleteCategory(id)
            return helper.response(response, 201, 'Category Deleted', result)
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    }
}