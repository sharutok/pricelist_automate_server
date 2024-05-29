const app = require('./App')
require('dotenv').config()
const PORT=8111

app.listen(PORT, () => {
    console.log(`listinting to ${PORT}`)
})

