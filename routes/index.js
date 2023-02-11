// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

const { authenticator } = require("../middleware/auth")

// 引入模組程式碼
const home = require("./modules/home");
const search = require("./modules/search");
const restaurant = require("./modules/restaurant");
const users = require("./modules/users");
const auth = require("./modules/auth")

// 將網址結構符合 輸入字串的 request 導向 對應模組
router.use("/search", authenticator, search);
router.use("/restaurants", authenticator, restaurant);
router.use("/users", users);
router.use("/auth", auth);
router.use("/", authenticator, home);

// 匯出路由器
module.exports = router;
