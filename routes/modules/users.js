// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")

const User = require("../../models/user")

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" })
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  }

  // 確認email是否重複註冊
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render("register", {errors, name, email, password, confirmPassword,})
      }
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash,
        }))
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
    })
})

// 匯出路由器
module.exports = router;
