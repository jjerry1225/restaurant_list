const db = require("../../config/mongoose");
const Restaurant = require("../restaurant"); // 載入restaurant model
const restaurantList = require("../../restaurant.json").results; // 載入restaurant.json 的陣列

// 連線成功
db.once("open", () => {
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!");
    })
    .catch((err) => console.log(err));
});
