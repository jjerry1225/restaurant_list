// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 引用restaurant的資料
const Restaurant = require("../../models/restaurant");

// route setting：新增，轉至新增頁面
router.get("/new", (req, res) => {
  res.render("new");
});

// route setting：新增餐廳，method = 'POST'
router.post("/", (req, res) => {
  const newRestaurant = req.body;
  Restaurant.create(newRestaurant)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// route setting：show出餐廳詳細資訊
router.get("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => res.render("show", { restaurantData }))
    .catch((err) => console.log(err));
});

// route setting：編輯餐廳，轉至編輯頁面
router.get("/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => res.render("edit", { restaurantData }))
    .catch((err) => console.log(err));
});

// route setting：編輯餐廳，method = 'PUT'
router.put("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .then((restaurantData) => {
      restaurantData.name = req.body.name;
      restaurantData.name_en = req.body.name_en;
      restaurantData.category = req.body.category;
      restaurantData.image = req.body.image;
      restaurantData.location = req.body.location;
      restaurantData.phone = req.body.phone;
      restaurantData.google_map = req.body.google_map;
      restaurantData.rating = req.body.rating;
      restaurantData.description = req.body.description;
      return restaurantData.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err));
});

// route setting：刪除餐廳，method = 'DELETE'
router.delete("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .then((restaurantData) => {
      restaurantData.remove();
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// 匯出路由器
module.exports = router;
