const connection = require("../config/mysql");

module.exports = {
  getAllHistory: (limit, offset, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history ORDER BY ${sort} ASC LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryToday: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE DAY(history_created_at) = DAY(NOW()) 
      AND YEAR(history_created_at) & YEAR(history_created_at) = YEAR(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE WEEK(history_created_at) = WEEK(NOW()) 
      AND YEAR(history_created_at) & YEAR(history_created_at) = YEAR(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryMonth: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE MONTH(history_created_at) = MONTH(NOW()) 
      AND YEAR(history_created_at) & YEAR(history_created_at) = YEAR(NOW())`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as total FROM history",
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE history_id = ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getSumChart: (date) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT DATE(history_created_at) AS date, SUM(history_subtotal) AS sum FROM history 
      WHERE MONTH(history_created_at) = MONTH('${date}') AND YEAR(history_created_at) = YEAR('${date}') 
      GROUP BY DATE(history_created_at)`,
        (error, result) => {
          // console.log(result);
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },
  getTotalIncome: (date) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(history_subtotal) AS total_income FROM history WHERE history_created_at 
      LIKE ?`,
        `%${date}%`,
        (error, result) => {
          // console.log(result[0].total_income);
          !error ? resolve(result[0].total_income) : reject(new Error(error));
        }
      );
    });
  },
  getTotalIncomeYear: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT SUM(history_subtotal) as Years FROM history WHERE YEAR(history_created_at) = YEAR(NOW())",
        (error, result) => {
          // console.log(result[0].Years);
          !error ? resolve(result[0].Years) : reject(new Error(error));
        }
      );
    });
  },
  getCountHistoryWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT COUNT(*) as orders FROM history WHERE YEARWEEK(history_created_at) = YEARWEEK(NOW())",
        (error, result) => {
          console.log(result);
          !error ? resolve(result[0].orders) : reject(new Error(error));
        }
      );
    });
  },
  postHistory: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO history SET ?",
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: result.insertId,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  patchHistory: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE history SET ? WHERE history_id = ?",
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: id,
              ...setData,
            };
            resolve(newResult);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
};
