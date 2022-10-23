const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const connection = require("./config");
const indexRouter = require("./routes/index.js");
dotenv.config();

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    key: "sid",
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      path: "/",
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: "None",
      httpOnly: true,
      secure: false,
    },
  })
);
app.use("/", indexRouter);

connection();

app.listen(app.get("port"), () => {
  console.log("NFT MarketPlace App server listening on port", app.get("port"));
});
