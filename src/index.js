require('dotenv').config({path: `${__dirname}/../.env`})
const express = require('express');
const bodyParser = require('body-parser');
const cityRouter = require('./router/cityRouter')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())

app.use('/city', cityRouter);

app.listen(PORT, () => {
    console.log('Sever ready');
})