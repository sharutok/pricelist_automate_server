const express = require('express')
const { insertDataInDB, getData, insert_into_pricelist_headers, get_pricelist_headers } = require('../Controller/getDataController')
const { verifyJWToken } = require('../Controller/AuthController')
const insertDataInDBRouter = express.Router()
require('dotenv').config('../.env')

// insertDataInDBRouter.get('/get', insertDataInDB)
// insertDataInDBRouter.get('/chunk', verifyJWToken, chunking)
insertDataInDBRouter.post('/data/by/pricelist', getData)
insertDataInDBRouter.post('/create/header/pricelist', insert_into_pricelist_headers)
insertDataInDBRouter.post('/get/header/pricelist', get_pricelist_headers)

module.exports = insertDataInDBRouter