const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

morgan.token("data", function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

logger.info('connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDb')
    }).catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/persons', personsRouter)
app.use(middleware.unknownEndpont)
app.use(middleware.errorHandler)

module.exports = app

