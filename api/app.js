const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const { cors } = require("./config/cors.config");
const { loadSession } = require("./config/session.config");
const { loadSessionUser } = require("./middlewares/session.middleware")

//--DB--
require("./config/db.config");

const app = express();

//--MIDDLEWARES--
app.use(cors);
app.use(express.json());
app.use(logger("dev"));
app.use(loadSession);
app.use(loadSessionUser)

//--API ROUTES--
const routes = require("./config/routes.config");
app.use("/api/v1/", routes);

//--PORT--
const port = Number(process.env.PORT || 3000);

app.listen(port, () => console.info(`Application running at port ${port}`));