const cityModel = require('../model/cityModel')

const getAllCity = async (req, res, next) => {
    try {
        const result = await cityModel.findAll({ raw: true })
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const getCityById = async (req, res, next) => {
    try {
        const result = await cityModel.findByPk(req.params.id, { raw: true })
        if (result) {
            return res.status(200).json(result)
        }
        return next({ code: 404, message: 'Not Found' })
    } catch (error) {
        next(error)
    }
}

const getCityByName = async (req, res, next) => {
    try {
        const result = await cityModel.findAll({ where: { name: req.params.name }, raw: true })
        if (result) {
            return res.status(200).json(result)
        }
        return next({ code: 404, message: 'Not Found' })
    } catch (error) {
        next(error)
    }
}

const addCity = async (req, res, next) => {
    try {
        const newCity = await cityModel.create({ name: req.body.name, zip: req.body.zip })
        console.log(newCity);
        res.status(201).json(newCity)
    } catch (error) {
        next(error)
    }
}

const updateCity = async (req, res, next) => {
    try {
        const result = await cityModel.update({ name: req.body.name, zip: req.body.zip }, { where: { id: req.body.id } })
        if(result[0] == 0){
            return next({ code: 404, message: 'City id not found'})
        }
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const deleteCity = async (req, res, next) => {
    try {
        if (!req.params.id) {
            return next({ code: 400, message: 'City id incorrect' })
        }
        await cityModel.destroy({where: {id: req.params.id}})
        res.status(204).json()
    } catch (error) {
        next(error)
    }
}

const handleError = async (error, req, res, next) => {
    console.log(error);
    const errCode = error.code || 500
    res.status(errCode).json(error.message)
}

module.exports = {
    getAllCity,
    getCityById,
    getCityByName,
    addCity,
    updateCity,
    deleteCity,
    handleError
}