const express = require("express");
const app = express();
const port = 4000;
const bodyparse = require("body-parser");
const cores = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const cloudinary = require('cloudinary').v2;


// configs path of env
dotenv.config({ path: "./config.env" })


// Configuration 
cloudinary.config({
  cloud_name: "shreyaspatil",
  api_key: "926929596843919",
  api_secret: "UoO1DWzvy-djf_x1xISCVz85WSo"
});

app.use(cores());
app.use(helmet());
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extended: true}));
app.use(cookieParser())

// connecting to the database 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
})





// //routes home
app.get('/', (req, res) => {
    res.json({welcome :'Welcome to mystore!'})
  })


const auth = require("./routes/authRoute");
app.use("/api/v1/auth", auth)
const categorys = require("./routes/categoryRoute");
app.use("/api/v1/categorys", categorys)
const brand = require("./routes/brandRoutes");
app.use("/api/v1/brands", brand)
const products = require("./routes/productRoute");
app.use("/api/v1/products", products)
const cart = require("./routes/cartRoute");
app.use("/api/v1/cart", cart)
const order = require("./routes/orderRoutes");
app.use("/api/v1/order", order)


app.listen(process.env.port , ()=> {
    console.log(`server is working on port ${port}`)
})