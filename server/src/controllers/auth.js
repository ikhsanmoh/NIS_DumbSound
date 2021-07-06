const { users: User } = require('../../models')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registration = async (req, res) => {
  try {
    const { body } = req

    const schema = joi.object({
      fullName: joi.string().min(6).required(),
      email: joi.string().email().min(8).required(),
      password: joi.string().min(8).required(),
      listAs: joi.string().required(),
      gender: joi.string().required(),
      phone: joi.string().min(10).required(),
      address: joi.string().required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const emailValidation = await User.findOne({
      where: {
        email: body.email
      }
    })

    if (emailValidation) {
      return res.status(409).send({
        status: 'failed',
        message: 'Email already registered'
      })
    }

    const hashStrenght = 10
    const hashedPass = await bcrypt.hash(body.password, hashStrenght)

    const newUser = await User.create({
      fullName: body.fullName,
      email: body.email,
      password: hashedPass,
      listAs: body.listAs,
      gender: body.gender,
      phone: body.phone,
      address: body.address,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const accessToken = jwt.sign({
      id: newUser.id
    }, process.env.SECRET_KEY)

    res.send({
      msg: 'success',
      data: {
        fullName: newUser.fullName,
        token: accessToken
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

exports.login = async (req, res) => {
  try {
    console.log('login')
    const { body } = req

    const schema = joi.object({
      email: joi.string().email().min(6).required(),
      password: joi.string().min(8).required()
    })

    const { error } = schema.validate(body)

    if (error) {
      return res.status(422).send({
        status: 'invalid',
        message: error.details[0].message
      })
    }

    const emailValidation = await User.findOne({
      where: {
        email: body.email
      }
    })

    if (!emailValidation) {
      return res.status(404).send({
        status: 'failed',
        message: 'Invalid Email or Password!'
      })
    }

    const passwordValidation = await bcrypt.compare(body.password, emailValidation.password)

    // const passwordValidation = await User.findOne({
    //   where: {
    //     password: body.password
    //   }
    // })

    if (!passwordValidation) {
      return res.status(404).send({
        status: 'failed',
        message: 'Invalid Email or Password!'
      })
    }

    const accessToken = jwt.sign({
      id: emailValidation.id
    }, process.env.SECRET_KEY)

    res.send({
      status: 'success',
      data: {
        fullName: emailValidation.fullName,
        email: emailValidation.email,
        token: accessToken
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