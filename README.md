# 我的餐廳清單
利用node.js與mongoDB資料庫打造的餐廳清單，使用者可以註冊、登入，並檢視喜愛餐廳的詳細資料，也可新增或刪除喜愛的餐廳清單。

## 網站頁面
![login](https://user-images.githubusercontent.com/118960946/218289821-f3bd573e-9d02-4b19-aa98-f4afa5cd22da.png)
![restaurant_ver 2](https://user-images.githubusercontent.com/118960946/209093789-ab2cfab0-af6f-412f-9209-181eaff7b5db.png)


## 功能介紹
● 使用者登入：使用者可以透過Email、密碼登入，亦可使用第三方應用程式Facebook登入，若是密碼不正確，或是帳號不存在，會跳出提示訊息。

● 使用者註冊：使用者需輸入名字、帳號、密碼，並重複輸入密碼確認密碼正確，名字為非必填其他為必填，若Email已註冊、兩次輸入密碼不一致、必填欄位未填，皆會跳出提示訊息。

● 查看所有餐廳

● 瀏覽餐廳的詳細資訊

● 連結餐廳的地址到 Google 地圖

● 搜尋特定餐廳

● 新增餐廳

● 編輯餐廳

● 刪除餐廳

## 使用說明
1. 請先確認有安裝 node.js 與 npm

2. 將專案 clone 到本地

3. 在本地開啟之後，透過終端機進入資料夾，輸入：
```
npm install
```
安裝完畢後，將種子資料匯入mongodb中，輸入以下：
```
npm run seed
```
若終端機顯示restaurantSeeder done!即代表成功匯入種子資料，

完成後，即可接著執行主程式，輸入以下：
```
npm run dev
```
若看見此二行訊息Express is listening on http://localhost:3000與mongodb connected!則代表順利運行，打開瀏覽器進入到以下網址：
```
http://localhost:3000
```
若欲暫停使用
```
ctrl + c
```

## 開發工具
● Node.js 14.16.0

● Express 4.17.1

● Express-Handlebars 3.0.0

● Bootstrap 5.2.3

● Font-awesome 5.8.1

● MongoDB

● mongoose 5.9.7

● bcryptjs 2.4.3

● connect-flash 0.1.1

● express-session 1.17.13

● passport 0.4.1

● passport-facebook 3.0.0

● passport-local 1.0.0

● dotenv 8.2.0


