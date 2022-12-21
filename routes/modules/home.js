// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 引用restaurant的資料
const Restaurant = require("../../models/restaurant");

router.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then((restaurantData) => res.render("index", { restaurantData }))
    .catch((error) => console.log(error));
});

// 匯出路由器
module.exports = router;
