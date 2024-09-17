const morgan = require('morgan')
const cors=require('cors')
const fetchDataRouter = require('./routers/fetchDataRoute')
const updateDataRouter = require('./routers/updateDataRoute')
const authRoute = require('./routers/authRoute')
require('dotenv').config('.env')
const app = require('express')()
const express=require('express')
const insertDataRouter = require('./routers/insertDataRoute')
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/app/price-list/v1/', fetchDataRouter)
app.use('/app/price-list/v1/update/', updateDataRouter)
app.use('/app/price-list/v1/insert/', insertDataRouter)
app.use('/app/auth/v1/', authRoute)
app.use('/health-check', (req, res) => { 
    try {
        console.log("ök");
        res.status(200).json({
            array: [1, 2, 3, 4, 5]
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports=app