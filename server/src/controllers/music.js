// Models


exports.getMusics = async (req, res) => {
  try {
    res.send({
      status: 'success',
      data: []
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({
      status: "failed",
      message: "Server Error"
    })
  }
}