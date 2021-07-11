// Models
const { artists: Artist, musics: Music } = require('../../models')
const joi = require('joi')
const jwt = require('jsonwebtoken')

exports.addArtist = async (req, res) => {
  try {
    const { body } = req

    const schema = joi.object({
      name: joi.string().min(6).required(),
      type: joi.string().required(),
      old: joi.required(),
      startCareer: joi.string().required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const createArtist = await Artist.create({
      name: body.name,
      old: body.old,
      type: body.type,
      startCareer: body.startCareer,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    res.send({
      msg: 'success',
      data: {
        id: createArtist.id,
        name: createArtist.name,
        old: createArtist.old,
        type: createArtist.type,
        startCareer: createArtist.startCareer,
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.addMusic = async (req, res) => {
  try {
    const { body } = req
    const image = req.files.image[0].filename
    const audio = req.files.audio[0].filename

    const reqPostData = {
      ...body,
      thumbnail: image,
      attache: audio
    }

    const schema = joi.object({
      title: joi.string().required(),
      year: joi.string().required(),
      thumbnail: joi.required(),
      attache: joi.string().required(),
      artistId: joi.required()
    })

    const { error } = schema.validate(reqPostData)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const checkArtists = await Artist.findOne({
      where: { id: reqPostData.artistId }
    })

    if (!checkArtists) {
      return res.status(404).send({
        status: 'failed',
        message: `Artist with ID: ${reqPostData.artistId} is Not Found`
      })
    }

    const createMusic = await Music.create({
      artist: reqPostData.artistId,
      title: reqPostData.title,
      year: reqPostData.year,
      thumbnail: reqPostData.thumbnail,
      attache: reqPostData.attache,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const getCreatedMusic = await Music.findOne({
      where: { id: createMusic.id },
      include: {
        model: Artist,
        as: 'artis',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['artist', 'createdAt', 'updatedAt']
      }
    })

    const path = process.env.UPLOADS_PATH
    const parseJSON = JSON.parse(JSON.stringify(getCreatedMusic))

    const modifiedNewMusic = {
      ...parseJSON,
      thumbnail: path + parseJSON.thumbnail,
      attache: path + parseJSON.attache
    }

    res.send({
      msg: 'success',
      data: modifiedNewMusic
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })

    res.send({
      status: 'success',
      data: artists
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.getMusics = async (req, res) => {
  try {
    const musics = await Music.findAll({
      include: {
        model: Artist,
        as: 'artis',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['artist', 'createdAt', 'updatedAt']
      }
    })

    const path = process.env.UPLOADS_PATH
    const parseJSON = JSON.parse(JSON.stringify(musics))

    const modifiedMusics = parseJSON.map(music => {
      return {
        ...music,
        thumbnail: path + music.thumbnail,
        attache: path + music.attache
      }
    })

    res.send({
      status: 'success',
      data: modifiedMusics
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}