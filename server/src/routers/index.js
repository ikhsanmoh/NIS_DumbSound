require('dotenv').config()
const express = require('express')
const router = express.Router()

// Controllers
const {
  login,
  registration
} = require('../controllers/auth')
const { getMusics } = require('../controllers/music')

// Endpoints
router.post('/login', login)
router.post('/register', registration)
router.get('/musics', getMusics)

module.exports = router