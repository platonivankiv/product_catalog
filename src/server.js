require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const errorMiddleware = require('./middlewares/error.middleware')
const tasksService = require('./services/domain/tasks.service')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/v1', router)
app.use(errorMiddleware)
tasksService.start()

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
