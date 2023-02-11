// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 引用restaurant的資料
const Restaurant = require("../../models/restaurant");

// route setting：搜尋
router.get("/", (req, res) => {
  if (!req.query.keyword) {
    return res.redirect("/");
  }

  const userId = req.user._id;
  const keywords = req.query.keyword.toLocaleLowerCase().trim();
  Restaurant.find({ userId })
    .lean()
    .then((restaurantData) => {
      const filterRestaurantsData = restaurantData.filter(
        (data) =>
          data.name.toLowerCase().includes(keywords) ||
          data.category.includes(keywords)
      );
      res.render("index", {
        restaurantData: filterRestaurantsData,
        keyword: req.query.keyword,
      });
    })
    .catch((error) => console.log(error));
});

// 匯出路由器
module.exports = router;
