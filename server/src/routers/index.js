require('dotenv').config()
const express = require('express')
const router = express.Router()

// Controllers
const {
  login,
  registration
} = require('../controllers/auth')

const {
  addArtist,
  getMusics
} = require('../controllers/music')

const { addPayment } = require('../controllers/payment')

// Middleware
const { auth } = require('../middleware/auth')

// Endpoints
router.post('/login', login)
router.post('/register', registration)
router.get('/musics', getMusics)
router.post('/artist', auth, addArtist)
router.post('/transaction', auth, addPayment)

module.exports = router