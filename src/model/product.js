const connection = require('../config/mysql')

module.exports = {
    getProduct: (limit, offset, sort) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product ORDER BY ${sort} ASC LIMIT ? OFFSET ?`, [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductCount: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(*) as total FROM product`, (error, result) => {
                !error ? resolve(result[0].total) : reject(new Error(error))
            })
        })
    },
    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product WHERE product_id = ?`, id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductByName: (keyword) => {
        return new Promise((resolve, reject) => {
            connection.query(`
            SELECT product.product_id, category.category_name, product.product_name, product.product_harga, product.product_created_at, product_updated_at 
            FROM product 
            INNER JOIN category ON product.category_id = category.category_id 
            WHERE product.product_name LIKE ?`, `%${keyword}%`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductNameSorted: () => {
        return new Promise((resolve, reject) => {
            connection.query(`
            SELECT product.product_id, category.category_name, product.product_name, product.product_harga, product.product_created_at, product_updated_at 
            FROM product 
            INNER JOIN category ON product.category_id = category.category_id 
            ORDER BY product.product_name ASC`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductCategorySorted: () => {
        return new Promise((resolve, reject) => {
            connection.query(`
            SELECT product.product_id, category.category_name, product.product_name, product.product_harga, product.product_created_at, product_updated_at 
            FROM product 
            INNER JOIN category ON product.category_id = category_id
            ORDER BY category.category_name ASC`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductDateSorted: () => {
        return new Promise((resolve, reject) => {
            connection.query(`
            SELECT product.product_id, category.category_name, product.product_name, product.product_harga, product.product_created_at, product_updated_at 
            FROM product 
            INNER JOIN category ON product.category_id = category_id
            ORDER BY product.product_created_at ASC`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getProductPriceSorted: () => {
        return new Promise((resolve, reject) => {
            connection.query(`
            SELECT product.product_id, category.category_name, product.product_name, product.product_harga, product.product_created_at, product_updated_at 
            FROM product 
            INNER JOIN category ON product.category_id = category_id
            ORDER BY product.product_harga ASC`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postProduct: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO product SET ?`, setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    patchProduct: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE product SET ? WHERE product_id = ?`, [setData, id], (error, result) => {
                if (!error) {
                    const newResult = {
                        product_id: id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM product WHERE product_id = ?`, id, (error, result) => {
                if (!error) {
                    const newResult = {
                        id: id
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}