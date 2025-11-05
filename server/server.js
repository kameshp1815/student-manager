const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { connectDB } = require('./config/db')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
  const { MONGODB_URI, JWT_SECRET, PORT = 5000 } = process.env
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not set')
  // if (!JWT_SECRET) throw new Error('JWT_SECRET is not set')
  await connectDB(MONGODB_URI)
  app.listen(PORT, () => console.log(`API listening on ${PORT}`))
}

start().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
