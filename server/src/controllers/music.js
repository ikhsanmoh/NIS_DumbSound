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

    const createMusic = await Artist.create({
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
        id: createMusic.id,
        name: createMusic.name,
        old: createMusic.old,
        type: createMusic.type,
        startCareer: createMusic.startCareer,
      }
    })
  } catch (error) {

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

    res.send({
      status: 'success',
      data: musics
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}