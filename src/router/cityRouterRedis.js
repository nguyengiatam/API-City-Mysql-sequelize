const cityController = require('../controller/cityCotrollerRedis')
const express = require('express')
const router = express.Router()

router.get('/', cityController.getAll)
router.get('/key/:key', cityController.getCityByKey)
router.post('/add', cityController.addCity)
router.put('/update', cityController.updateCity)
router.delete('/delete/:key', cityController.deleteCity)
router.use(cityController.handleError)

module.exports = router