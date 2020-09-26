const express = require('express')
const http = require('http')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)

const uri = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
// const PORT = config.get('port') || 3001

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))

const socket = require('./socket')(server)

async function start() {
  try {
    // await mongoose.connect(config.get('MONGODB_URI'), {
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
