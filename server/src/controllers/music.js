// Models
const { artists: Artist, musics: Music } = require('../../models')


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