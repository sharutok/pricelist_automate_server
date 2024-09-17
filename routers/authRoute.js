const authRoute = require('express').Router()

const { generateToken } = require('../Controller/AuthController')

authRoute.get('/toket-get', generateToken)

module.exports=authRoute