const express = require('express')
const { INSERT_DATA_FROM_XL_TO_DB_ELECTRODE,INSERT_DATA_FROM_XL_TO_DB_EGP,INSERT_DATA_FROM_XL_TO_DB_HYPERTHERM,INSERT_DATA_FROM_XL_TO_DB_SPARES,INSERT_DATA_FROM_XL_TO_DB_WandF } = require('../Controller/insertDataController')

const insertDataRoute = express.Router()

insertDataRoute.get('/spares', INSERT_DATA_FROM_XL_TO_DB_SPARES)
insertDataRoute.get('/egp', INSERT_DATA_FROM_XL_TO_DB_EGP)
insertDataRoute.get('/electrode', INSERT_DATA_FROM_XL_TO_DB_ELECTRODE)
insertDataRoute.get('/hypertherm', INSERT_DATA_FROM_XL_TO_DB_HYPERTHERM)
insertDataRoute.get('/wires-flux', INSERT_DATA_FROM_XL_TO_DB_WandF)

module.exports = insertDataRoute






