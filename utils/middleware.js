const logger = require('./logger')

const unknownEndpont = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}
module.exports = { unknownEndpont, errorHandler }