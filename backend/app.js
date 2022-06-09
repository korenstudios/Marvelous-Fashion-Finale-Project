require("dotenv").config();
require("./passport");

const mongoose = require("mongoose");
const cors = require("cors");

const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

const usersRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const categoriesRouter = require("./routers/categories");
const filesRouter = require("./routers/files");
const productsRouter = require("./routers/products");
const cartRouter = require("./routers/cart");
const wishlistRouter = require("./routers/wishlist");
const paypalRouter = require("./routers/paypal");
const stripeRouter = require("./routers/stripe");

// Connect to mongodb
const URI = process.env.MONGODB_URL;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB."))
  .catch((error) => console.log("MongoDB connection failed", error));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/files", filesRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/paypal", paypalRouter);
app.use("/api/stripe", stripeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
