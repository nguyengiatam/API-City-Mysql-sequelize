const redis = require('../config/redis.config')

async function addCity(req, res, next) {
    try {
        if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('zip')) {
            return next({code: 400, message: 'Invalid request'})
        }
        const key = Date.now()
        await redis.hset(key, {key, name: req.body.name, zip: req.body.zip });
        res.status(201).json()
    } catch (error) {
        next(error)
    }
}

async function getAll(req, res, next) {
    try {
        const result = await redis.scan(0)
        let data = [];
        result[1].forEach(val => data.push(redis.hgetall(val)));
        data = await Promise.all(data)
        res.status(200).json(data)
    } catch (error) {
        next(error);
    }
}

async function getCityByKey(req, res, next){
    try {
        const city = await redis.hgetall(req.params.key)
        res.status(200).json(city)
    } catch (error) {
        next(error)
    }
}

async function updateCity(req, res, next){
    try {
        const dataUpdate = {...req.body}
        const result = await redis.hmset(req.body.key, dataUpdate)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

async function deleteCity(req, res, next){
    try {
        const result = await redis.del(req.params.key)
        res.status(204).json(result)
    } catch (error) {
        next(error)
    }
}

async function handleError(error, req, res, next){
    const errCode = error.code || 500
    res.status(errCode).json(error.message)
}

module.exports = {
    addCity,
    getAll,
    getCityByKey,
    updateCity,
    deleteCity,
    handleError
}

