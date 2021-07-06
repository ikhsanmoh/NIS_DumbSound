const express = require('express')
const router = express.Router()

// Controllers
const { getMusics } = require('../controllers/music')

// Endpoints
router.get('/musics', getMusics)

module.exports = router