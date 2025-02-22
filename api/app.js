const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const app = express();

//--DB--
require("./config/db.config");

//--MIDDLEWARES--
app.use(express.json());
app.use(logger('dev'));

//--API ROUTES--
const routes = require('./config/routes.config');
app.use('/api/v1/', routes);

//--PORT--
const port = Number(process.env.PORT || 3000);

app.listen(port, () => console.info(`Application running at port ${port}`));