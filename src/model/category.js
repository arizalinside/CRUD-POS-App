const connection = require('../config/mysql')

module.exports = {
    getAllCategory: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM category`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getCategoryCount: () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT COUNT(*) as total FROM category`,
                (error, result) => {
                    !error ? resolve(result[0].total) : reject(new Error(error));
                }
            );
        });
    },
    getCategoryCountByName: (keyword) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT COUNT(*) as total FROM category WHERE category_name LIKE ?`,
                `%${keyword}%`,
                (error, result) => {
                    !error ? resolve(result[0].total) : reject(new Error(error));
                }
            );
        });
    },
    getCategoryById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM category WHERE category_id = ?`, id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getCategoryByName: (keyword) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `
                SELECT * 
                FROM category  
                WHERE category_name LIKE ?`,
                `%${keyword}%`,
                (error, result) => {
                    !error ? resolve(result) : reject(new Error(error));
                }
            );
        });
    },
    postCategory: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO category SET ?`, setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        category_id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    patchCategory: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE category SET ? WHERE category_id = ?`, [setData, id], (error, result) => {
                if (!error) {
                    const newResult = {
                        category_id: id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM category WHERE category_id = ?`, id, (error, result) => {
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