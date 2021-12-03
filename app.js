const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
require('dotenv').config()

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

const usersRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)


app.use((req, res) => {
  res.status(400).json({ message: "Bad request"  })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message: err.message })
})



module.exports = app
