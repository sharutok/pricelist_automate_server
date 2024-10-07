const express = require('express')
const { insertDataInDB, getData, insert_into_pricelist_headers, get_pricelist_headers } = require('../Controller/getDataController')
const { verifyJWToken } = require('../Controller/AuthController')
const insertDataInDBRouter = express.Router()
require('dotenv').config('../.env')

insertDataInDBRouter.post('/data/by/pricelist', verifyJWToken, getData)
insertDataInDBRouter.post('/get/header/pricelist',verifyJWToken, get_pricelist_headers)
insertDataInDBRouter.post('/create/header/pricelist', insert_into_pricelist_headers)

module.exports = insertDataInDBRouter