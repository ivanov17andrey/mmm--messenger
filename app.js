const express = require('express')
const http = require('http')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const server = http.createServer(app)

const uri = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001

app.use(express.json({ extended: true }))

app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.use('/api/auth', require('./routes/auth.routes'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

const socket = require('./socket')(server)

async function start() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    server.listen(PORT, () => console.log(`App work on port ${PORT}...`))
  } catch (err) {
    console.error('Server Error', err.message)
    process.exit(1)
  }
}

start()
