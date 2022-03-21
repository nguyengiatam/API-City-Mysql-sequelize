require('dotenv').config({path: `${__dirname}/../.env`})
const express = require('express');
const bodyParser = require('body-parser');
const cityRouter = require('./router/cityRouter')
const cityRouterRedis = require('./router/cityRouterRedis')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())

app.use('/city', cityRouter);
app.use('/cityRedis', cityRouterRedis);

app.listen(PORT, () => {
    console.log('Sever ready');
})