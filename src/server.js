require('dotenv').config()

const express = require('express')
const router = require('./routes')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

app.use(express.json())
app.use('/api/v1', router)
app.use(errorMiddleware)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
