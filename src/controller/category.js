const { getAllCategory, getCategoryCountByName, getCategoryByName, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../model/category')
const helper = require('../helper/index')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
    getAllCategory: async (request, response) => {
        try {
            const result = await getAllCategory();
            client.set('getallcategory', JSON.stringify(result))
            return helper.response(response, 200, 'Success Get Category', result)
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
            client.set(`getcategorybyname:${keyword}`, JSON.stringify(result))
            if (searchResult.length > 0) {
                return helper.response(
                    response,
                    201,
                    "Success Get Category By Name",
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
    getCategoryById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getCategoryById(id);
            client.set(`getcategorybyid:${id}`, JSON.stringify(result))
            if (result.length > 0) {
                return helper.response(response, 200, 'Success Get Category By ID', result)
            } else {
                return helper.response(response, 404, `Category By Id : ${id} Not Found`)
            }
        } catch (error) {
            // console.log(error)
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