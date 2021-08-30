const express = require("express");
const app = express();
const config = require("./src/config/index");
const morgan = require("morgan");
const sequelize = require("./src/libs/sequelize");
const router = require("./src/router/index");
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
router(app);

app.listen(config.PORT, () => {
  console.log(`Server run in ${config.HOST}:${config.PORT}`);
  sequelize.authenticate()
    .then(() => {
      console.log(`database connected`);
    })
    .catch((error) => {
      console.log(
        `
    error connecting to database`,
        error
      );
    });
});
