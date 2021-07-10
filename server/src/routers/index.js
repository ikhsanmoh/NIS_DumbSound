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

const {
  addPayment,
  getPayments,
  changePaymentStatus
} = require('../controllers/payment')

// Middleware
const { auth } = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')

// Constant
const UPLOADS_FIELD_NAME = 'image'

// Endpoints
router.post('/login', login)
router.post('/register', registration)
router.get('/musics', getMusics)
router.post('/artist', auth, addArtist)
router.post('/transaction', auth, uploadFile(UPLOADS_FIELD_NAME), addPayment)
router.get('/transactions', auth, getPayments)
router.put('/transaction', auth, changePaymentStatus)


module.exports = router