const express = require('express')
const { update_spares,update_egp,update_electrodes,update_hypertherm,update_wires_and_flux, update_all } = require('../Controller/updateDataController')
const updateDataRoute = express.Router()

updateDataRoute.get('/spares',update_spares)
updateDataRoute.get('/egp',update_egp)
updateDataRoute.get('/electrode',update_electrodes)
updateDataRoute.get('/hypertherm',update_hypertherm)
updateDataRoute.get('/wires-flux', update_wires_and_flux)
updateDataRoute.get('/all', update_all)

module.exports = updateDataRoute






