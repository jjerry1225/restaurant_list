const db = require("../../config/mongoose");
const bcrypt = require("bcryptjs");
const Restaurant = require("../restaurant"); // 載入restaurant model
const User = require("../user"); // 載入User model

const restaurantList = require("../../restaurant.json").results; // 載入restaurant.json 的陣列
const restaurantList1 = restaurantList.slice(0, 3);
const restaurantList2 = restaurantList.slice(3, 6);

const names = ["user1", "user2"];
const emails = ["user1@example.com", "user2@example.com"];
const password = "12345678";

function addRestaurant(data) {
  return Restaurant.create(data);
}

// 連線成功
db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) => {
      return Promise.all(
        Array.from({ length: 2 }, (_, i) =>
          User.create({
            name: names[i],
            email: emails[i],
            password: hash,
          })
        )
      );
    })
    .then((user) => {
      for (let i = 0; i < 3; i++) {
        restaurantList1[i].userId = user[0]._id;
        restaurantList2[i].userId = user[1]._id;
      }
      return Promise.all([
        addRestaurant(restaurantList1),
        addRestaurant(restaurantList2),
      ]);
    })
    .then(() => {
      console.log("restaurantSeeder done!");
      process.exit();
    });
});
