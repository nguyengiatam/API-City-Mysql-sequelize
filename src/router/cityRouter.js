const express = require('express');
const router = express.Router();
const cityController = require('../controller/cityController')

router.get('/', cityController.getAllCity)
router.get('/id/:id', cityController.getCityById)
router.get('/name/:name', cityController.getCityByName)
router.post('/add', cityController.addCity)
router.put('/update', cityController.updateCity)
router.delete('/delete/:id', cityController.deleteCity)
router.use(cityController.handleError)

module.exports = router