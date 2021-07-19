const { users: User } = require('../../models')

exports.checkUserSubscription = async (req, res) => {
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

    res.send({
      status: 'success',
      data: {
        user: {
          id: checkUser.id,
          subscribe: checkUser.subscribe
        }
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
