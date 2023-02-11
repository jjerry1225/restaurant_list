// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 引入模組程式碼
const home = require("./modules/home");
const search = require("./modules/search");
const restaurant = require("./modules/restaurant");
const users = require("./modules/users");

// 將網址結構符合 輸入字串的 request 導向 對應模組
router.use("/", home);
router.use("/search", search);
router.use("/restaurants", restaurant);
router.use("/users", users);

// 匯出路由器
module.exports = router;
