// Models
const { users: User, payments: Payment } = require('../../models')
const joi = require('joi')
const jwt = require('jsonwebtoken')

exports.addPayment = async (req, res) => {
  try {
    const { body } = req
    const { idUser: userId } = req.authData

    const schema = joi.object({
      startDate: joi.string().required(),
      dueDate: joi.string().required(),
      attache: joi.string().required(),
      status: joi.string().required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const createPayment = await Payment.create({
      userId,
      startDate: body.startDate,
      dueDate: body.dueDate,
      attache: body.attache,
      status: body.status,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    res.send({
      msg: 'success',
      data: {
        id: createPayment.id,
        startDate: createPayment.startDate,
        dueDate: createPayment.dueDate,
        attache: createPayment.attache,
        status: createPayment.status,
        userId: createPayment.userId
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