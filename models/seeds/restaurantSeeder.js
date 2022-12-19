const mongoose = require("mongoose");
const Restaurant = require("../restaurant"); // 載入restaurant model
const restaurantList = require("../../restaurant.json").results; // 載入restaurant.json 的陣列

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// connect to mongoose
mongoose.set("strictQuery", true);
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
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!");
    })
    .catch((err) => console.log(err));
});
