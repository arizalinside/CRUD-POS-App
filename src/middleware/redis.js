const redis = require("redis");
const client = redis.createClient();
const helper = require("../helper/index");

module.exports = {
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          console.log("data ada di dalam redis");
          const setData = JSON.parse(result)
          // console.log(setData);
          return helper.response(
            response,
            200,
            "Success Get Product",
            setData.result,
            setData.pageInfo
          );
        } else {
          console.log("data tidak ada di dalam redis");
          next();
        }
      }
    );
  },
  getProductByNameRedis: (request, response, next) => {
    const { keyword } = request.query;
    client.get(`getproductbyname:${keyword}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          `Success Get Product: ${keyword}`,
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(response, 200, JSON.parse(result));
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  clearDataProductRedis: (request, response, next) => {
    client.flushall((error, result) => {
      console.log(result);
    });
    next();
  },
  getAllCategoryRedis: (request, response, next) => {
    client.get("getallcategory", (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        const setData = JSON.parse(result)
        // console.log(setData);
        return helper.response(
          response,
          200,
          "Get All Category Success!",
          setData
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getCategoryByNameRedis: (request, response, next) => {
    const { keyword } = request.query;
    client.get(`getcategorybyname:${keyword}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          `Success Get Category: ${keyword}`,
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getCategoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getcategorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          `Get Category ID: ${id}, Success!`,
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  clearDataCategoryRedis: (request, response, next) => {
    client.flushall((error, result) => {
      if (!error && result != null) {
        console.log(result);
      } else {
        console.log(error);
      }
    });
    next();
  },
  getAllOrderRedis: (request, response, next) => {
    client.get("getallorder", (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          "Get All Order Success!",
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  getOrderByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`getorderbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          `Get Order ID: ${id}, Success!`,
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  clearDataOrderRedis: (request, response, next) => {
    client.flushall((error, result) => {
      if (!error && result != null) {
        console.log(result);
      } else {
        console.log(error);
      }
    });
    next();
  },
  //============ [HISTORY] ============
  getAllHistoryRedis: (request, response, next) => {
    const { page, limit, sort } = request.query;
    client.get(
      `getallhistory:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          console.log("data ada di dalam redis");
          return helper.response(
            response,
            200,
            "Get All Order Success!",
            JSON.parse(result)
          );
        } else {
          console.log("data tidak ada di dalam redis");
          next();
        }
      }
    );
  },
  getHistoryByIdRedis: (request, response, next) => {
    const { id } = request.params;
    client.get(`gethistorybyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log("data ada di dalam redis");
        return helper.response(
          response,
          200,
          `Get History ID: ${id}, Success!`,
          JSON.parse(result)
        );
      } else {
        console.log("data tidak ada di dalam redis");
        next();
      }
    });
  },
  clearDataHistoryRedis: (request, response, next) => {
    client.flushall((error, result) => {
      if (!error && result != null) {
        console.log(result);
      } else {
        console.log(error);
      }
    });
  },
  userRedis: (request, response, next) => {
    client.get("user", (error, result) => {
      if (!error && result != null) {
        return helper.response(
          response,
          200,
          "Get User Success",
          JSON.parse(result)
        );
      } else {
        next();
      }
    });
  },
  clearUserRedis: (request, response, next) => {
    client.keys("user*", (error, keys) => {
      if (!error && keys.length > 0) {
        keys.forEach((value) => {
          client.del(value);
        });
      }
      next();
    });
  },
};
