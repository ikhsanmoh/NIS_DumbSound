const express = require('express')
const routers = require('./src/routers')
const cors = require('cors');

const app = express()

// use Body Parser
app.use(express.json())
app.use(cors())

app.use('/api/v1', routers)
app.use('/uploads', express.static('uploads'))

app.listen(process.env.port || 5000, () => {
  console.log('Server Listening...')
})