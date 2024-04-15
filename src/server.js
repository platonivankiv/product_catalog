const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()

const router = require('./routes/index.js')

app.use('/', router)

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`)
})
