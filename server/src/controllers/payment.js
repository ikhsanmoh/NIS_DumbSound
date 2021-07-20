// Models
const { users: User, payments: Payment } = require('../../models')
const joi = require('joi')

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

exports.getPayments = async (req, res) => {
  try {
    const { idUser } = req.authData

    const checkUser = await User.findOne({
      where: { id: idUser }
    })

    if (checkUser.listAs !== '1') {
      return res.status(401).send({
        status: 'Access Denied.',
        message: 'API accessible by admin only.'
      })
    }

    const payments = await Payment.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password', 'listAs', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt']
      },
      order: [['createdAt', 'DESC']]
    })

    const path = process.env.UPLOADS_PATH
    const parseJSON = JSON.parse(JSON.stringify(payments))

    const modifiedPayments = parseJSON.map(payment => {
      return {
        ...payment,
        attacheLink: path + payment.attache
      }
    })

    res.send({
      status: 'success',
      data: modifiedPayments
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.changePaymentStatus = async (req, res) => {
  try {
    const { body } = req
    const { idUser } = req.authData

    const checkUser = await User.findOne({
      where: { id: idUser }
    })

    if (checkUser.listAs !== '1') {
      return res.status(401).send({
        status: 'Access Denied.',
        message: 'API accessible by admin only.'
      })
    }

    const schema = joi.object({
      paymentId: joi.required(),
      dueDate: joi.string().required(),
      status: joi.string().required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const checkPaymentId = await Payment.findOne({
      where: { id: body.paymentId }
    })

    if (!checkPaymentId) {
      return res.status(404).send({
        status: 'failed',
        message: `Payment with ID: ${body.paymentId} is Not Found`
      })
    }

    // Setup field to upadate
    const reqUpdateData = {
      dueDate: body.dueDate,
      status: body.status
    }

    await Payment.update(reqUpdateData, {
      where: { id: body.paymentId }
    })

    let subscription = 'false'
    if (reqUpdateData.status === 'Approved') {
      subscription = 'true'
    }

    const paymentData = await Payment.findOne({
      where: { id: body.paymentId },
      include: {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['fullName', 'email', 'gender', 'phone', 'address', 'subscribe', 'password', 'listAs', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['startDate', 'dueDate', 'attache', 'status', 'userId', 'createdAt', 'updatedAt']
      }
    })

    await User.update({
      subscribe: subscription
    }, {
      where: { id: paymentData.user.id }
    })

    const updatedPayment = await Payment.findOne({
      where: { id: body.paymentId },
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

    res.send({
      status: 'success',
      data: updatedPayment
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}

exports.checkUserPayment = async (req, res) => {
  try {
    const { idUser } = req.authData

    const checkUser = await User.findOne({
      where: { id: idUser }
    })

    if (!checkUser) {
      return res.status(404).send({
        status: 'failed',
        message: `User with ID: ${idUser} is Not Found`
      })
    }

    const payment = await Payment.findOne({
      include: {
        model: User,
        as: 'user',
        where: { id: idUser },
        attributes: {
          exclude: ['password', 'listAs', 'createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt']
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    })

    res.send({
      status: 'success',
      data: payment
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}
