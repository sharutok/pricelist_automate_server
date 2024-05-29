const morgan = require('morgan')
const cors=require('cors')
const fetchDataRouter = require('./routers/fetchDataRoute')
require('dotenv').config('.env')

const app = require('express')()
app.use(cors())
app.use(morgan('dev'))
app.use('/app/price-list/v1/', fetchDataRouter)

module.exports=app