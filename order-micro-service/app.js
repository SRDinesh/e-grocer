require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8003;
const routes = require('./src/utils/routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/order',routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})