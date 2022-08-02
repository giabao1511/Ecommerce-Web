const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const connectDB = require("./configs/connectDB");

app.use(express.json());
app.use(cors());
connectDB();

app.get("/test", (req, res) => {
  return res.status(200).json({
    message: "Gia Bao dep trai",
  });
});

const productRoutes = require("./routes/product.route");

app.use("/product", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
