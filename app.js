const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// 引用路由器，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案。
const routes = require("./routes");

// 套用express-handlebars
const exphbs = require("express-handlebars");

// 其他變數與資料
const port = 3000;

// express-handlebars設定
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));

// setting static files
app.use(express.static("public"));

// 套用method-override
app.use(methodOverride("_method"));

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

// route setting
app.use(routes);

// listen and start the express server
app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`);
});
