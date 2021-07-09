// Models
const { users: User, payments: Payment } = require('../../models')
const joi = require('joi')
const jwt = require('jsonwebtoken')

exports.addPayment = async (req, res) => {
  try {
    const { body } = req
    const { idUser: userId } = req.authData
    const image = req.files.image[0].filename

    const reqPostData = {
      ...body,
      attache: image
    }

    const schema = joi.object({
      startDate: joi.string().required(),
      dueDate: joi.string().required(),
      attache: joi.string().required(),
      status: joi.string().required()
    })

    const { error } = schema.validate(reqPostData)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const createPayment = await Payment.create({
      userId,
      startDate: reqPostData.startDate,
      dueDate: reqPostData.dueDate,
      attache: reqPostData.attache,
      status: reqPostData.status,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const getCreatedPayment = await Payment.findOne({
      where: { id: createPayment.id },
      include: {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password', 'listAs', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt']
      }
    })

    const path = process.env.UPLOADS_PATH
    const parseJSON = JSON.parse(JSON.stringify(getCreatedPayment))

    const modifiedPayment = {
      ...parseJSON,
      attache: path + parseJSON.attache
    }

    res.send({
      msg: 'success',
      data: modifiedPayment
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}