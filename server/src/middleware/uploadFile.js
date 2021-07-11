const multer = require('multer')

exports.uploadFile = (image, audio) => {
  // init multer diskstorage
  // Menentukan destination file upload
  // Menentukan nama file (rename agar tidak ada file yang sama / ganda)

  const fileName = ""
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads") //Lokasi penyimpanan file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ''))
    }
  })

  // function untuk filter file berdasarkan type
  const fileFilter = function (req, file, cb) {
    if (file.fieldname === image) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!"
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }

    if (file.fieldname === audio) {
      if (!file.originalname.match(/\.(mp3|mp4)$/)) {
        req.fileValidationError = {
          message: "Only audio files are allowed!"
        };
        return cb(new Error("Only audio files are allowed!"), false);
      }
    }
    cb(null, true)
  }

  const sizeInMB = 5000 // 5 mb
  const sizeInByte = sizeInMB * 1000 // 5.000.000 byte
  const maxSize = sizeInByte

  // eksekusi upload multer dan menentukan disk storage, validation dan maxfile size
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).fields([
    {
      name: image,
      maxCount: 1
    },
    {
      name: audio,
      maxCount: 1
    }
  ]); //untuk menentukan jumlah file

  return (req, res, next) => {
    upload(req, res, function (err) {
      // Pesan error jika validasi gagal
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError)
      }

      // Jika file upload tidak ada
      if (!req.files && !err) {
        return res.status(400).send({
          message: "Please select files to upload"
        })
      }

      if (err) {
        // Jika size melebihi batas
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 5 MB"
          })
        }
        return res.status(400).send(err)
      }

      // Jika oke dan aman lanjut ke controller
      // Akses file yang di upload melalui req.files
      return next()
    })
  }
}