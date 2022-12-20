// 套用express
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// 套用express-handlebars
const exphbs = require("express-handlebars");

// 其他變數與資料
const port = 3000;
const Restaurant = require("./models/restaurant");

// express-handlebars設定
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));

// setting static files
app.use(express.static("public"));

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 取得資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

// route setting：瀏覽頁面
app.get("/", (req, res) => {
  Restaurant.find({})
    .lean()
    .then((restaurantData) => res.render("index", { restaurantData }))
    .catch((error) => console.log(error));
});

// route setting：搜尋
app.get("/search", (req, res) => {
  if (!req.query.keyword) {
    return res.redirect("/");
  }

  const keywords = req.query.keyword.toLocaleLowerCase().trim();
  Restaurant.find({})
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

// route setting：新增，轉至新增頁面
app.get("/restaurants/new", (req, res) => {
  console.log("new one");
  res.render("new");
});

// route setting：新增餐廳，method = 'POST'
app.post("/restaurants", (req, res) => {
  const newRestaurant = req.body;
  Restaurant.create(newRestaurant)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// route setting：show出餐廳詳細資訊
app.get("/restaurants/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => res.render("show", { restaurantData }))
    .catch((err) => console.log(err));
});

// route setting：編輯餐廳，轉至編輯頁面
app.get("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => res.render("edit", { restaurantData }))
    .catch((err) => console.log(err));
});

// route setting：編輯餐廳，method = 'POST'
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
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
})

// route setting：刪除餐廳，method = 'POST'
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id;
  Restaurant.findById(id)
    .then((restaurantData) => {
      restaurantData.remove();
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
})

// listen and start the express server
app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`);
});
