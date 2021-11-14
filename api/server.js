const express = require("express")

const server = express()
//const { logger } = require("./cars/cars-middleware")
const carsRouter = require('./cars/cars-router')

const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

// global middleware
server.use(express.json())
server.use(morgan('dev'))
server.use(helmet())
server.use(cors())

// local middleware
//server.use(logger)

//connect Routes
server.use('/cars', carsRouter)

//home page
server.get('/', (req, res) => {
    res.status(200).json(
        {
            "status": 200,
            "message": 'KNEX is query language used to connect Node.js to SQLITE, a database engine',
            "time": new Date().toLocaleTimeString(),
        });
})

// catch all endpoint
// server.use('*', (req, res) => {
//     res.status(404).json({
//         message: 'not found',
//     })
// })

module.exports = server
