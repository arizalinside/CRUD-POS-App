const route = require("express").Router();

// import route disini
const product = require("./routes/product");
const category = require("./routes/category");
const order = require("./routes/order");
const history = require("./routes/history");
const users = require("./routes/users");

// buat middle disini
route.use("/product", product);
route.use("/category", category);
route.use("/orders", order);
route.use("/history", history);
route.use("/users", users)

module.exports = route;
