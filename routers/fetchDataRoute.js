const express = require('express')
const { insertDataInDB, chunking } = require('../Controller/getDataController')
const insertDataInDBRouter = express.Router()
require('dotenv').config('../.env')

insertDataInDBRouter.get('/get', insertDataInDB)
insertDataInDBRouter.get('/chunk', chunking)

module.exports = insertDataInDBRouter