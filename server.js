const sequelize = require("./config/db");
const express = require("express");
const cors = require("cors");
const router = require('./routes/routes')

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);

sequelize
  .sync()
  .then(() => console.log("db connection successfully"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`db connections successfully on this ${port}`);
});
