const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ApiRoute = require("./config/conf");
var cors = require('cors')
// const port = ApiRoute.port;
const port = process.env.PORT || 8080;
const getCovidRecord = require('./controller/get_covid_record/get_covid_record');
const addCovidRecord = require('./controller/add_covid_record/add_covid_record')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next();
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use('/api/covid/v1', logger, getCovidRecord,addCovidRecord);

app.listen(port, () => console.log("server is running on port : " + port));
