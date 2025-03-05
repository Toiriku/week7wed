require('dotenv').config()
const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");


const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
require('dotenv').config();

// Middlewares
app.use(cors())
app.use(express.json());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);


app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`)
// })  
