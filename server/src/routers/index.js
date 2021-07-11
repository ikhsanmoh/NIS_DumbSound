require('dotenv').config()
const express = require('express')
const router = express.Router()

// Auth Controllers
const {
  login,
  registration
} = require('../controllers/auth')

// Music Controllers
const {
  addArtist,
  addMusic,
  getMusics
} = require('../controllers/music')

// Payment/Transaction Controllers
const {
  addPayment,
  getPayments,
  changePaymentStatus
} = require('../controllers/payment')

// Middlewares
const { auth } = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')

// Constants
const UPLOADS_IMG_FIELD_NAME = 'image'
const UPLOADS_AUDIO_FIELD_NAME = 'audio'

// Auth Endpoints
router.post('/login', login)
router.post('/register', registration)

// Music Endpoints
router.post('/artist', auth, addArtist)
router.get('/musics', getMusics)
router.post('/music', auth, uploadFile(UPLOADS_IMG_FIELD_NAME, UPLOADS_AUDIO_FIELD_NAME), addMusic)

// Payment/Transaction Endpoints
router.post('/transaction', auth, uploadFile(UPLOADS_IMG_FIELD_NAME), addPayment)
router.get('/transactions', auth, getPayments)
router.put('/transaction', auth, changePaymentStatus)

module.exports = router