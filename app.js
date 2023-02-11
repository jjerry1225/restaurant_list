const express = require("express");
const app = express();
const session = require("express-session")
const methodOverride = require("method-override");
const flash = require("connect-flash")

// 載入設定檔，要寫在 express-session 以後
const usePassport = require("./config/passport")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 引用連線mongoose的檔案，對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
require('./config/mongoose')

// 引用路由器，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案。
const routes = require("./routes");

// 套用express-handlebars
const exphbs = require("express-handlebars");

// 其他變數與資料
const port = process.env.PORT;

// express-handlebars設定
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));

// 套用express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

// setting static files
app.use(express.static("public"));

// 套用method-override
app.use(methodOverride("_method"));

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// route setting
app.use(routes);

// listen and start the express server
app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`);
});
