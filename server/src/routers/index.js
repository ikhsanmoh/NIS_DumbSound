require('dotenv').config()
const express = require('express')
const router = express.Router()

// Auth Controllers
const {
  login,
  registration,
  checkAuth
} = require('../controllers/auth')

// Music Controllers
const {
  addArtist,
  getArtists,
  addMusic,
  getMusics
} = require('../controllers/music')

// Payment/Transaction Controllers
const {
  addPayment,
  getPayments,
  changePaymentStatus,
  checkUserPayment
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
router.get("/check-auth", auth, checkAuth);

// Music Endpoints
router.post('/artist', auth, addArtist)
router.get('/artists', getArtists)
router.get('/musics', getMusics)
router.post('/music', auth, uploadFile(UPLOADS_IMG_FIELD_NAME, UPLOADS_AUDIO_FIELD_NAME), addMusic)

// Payment/Transaction Endpoints
router.post('/transaction', auth, uploadFile(UPLOADS_IMG_FIELD_NAME), addPayment)
router.get('/transactions', auth, getPayments)
router.put('/transaction', auth, changePaymentStatus)
router.get("/check-user-payment", auth, checkUserPayment);

module.exports = router