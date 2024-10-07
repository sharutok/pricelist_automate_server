const authRoute = require('express').Router()

const { generateToken,verifyJWToken } = require('../Controller/AuthController')

authRoute.post('/toket-get', generateToken)
authRoute.post("/verify/token", verifyJWToken)

module.exports=authRoute