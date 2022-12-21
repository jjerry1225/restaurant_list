const express = require("express");
const app = express();
const methodOverride = require("method-override");

// 引用連線mongoose的檔案，對 app.js 而言，Mongoose 連線設定只需要「被執行」，不需要接到任何回傳參數繼續利用，所以這裡不需要再設定變數。
require('./config/mongoose')

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

// route setting
app.use(routes);

// listen and start the express server
app.listen(port, (req, res) => {
  console.log(`Express is listening on http://localhost:${port}`);
});
