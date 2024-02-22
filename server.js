const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("./Routes/UserRoute.js");
const cookieParser = require("cookie-parser")
const LandingRoute = require("./Routes/LandingRoute.js");
const ProductRoute = require("./Routes/ProductsRoute.js");


const app = express();
const PORT = 5001;
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

mongoose.connect("mongodb://localhost:27017/stock_management");

app.use("/api/user", UserRoute);
app.use("/api/landing", LandingRoute);
app.use("/api/products/", ProductRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
