const multer = require('multer');
const fs = require('fs')

const storageUser = multer.diskStorage({
    destination: function (req, file, cb){
        const path = `uploads/${req.params.collection}`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb){
        const ext = file.mimetype.split('/')[1];
        const filename = file.originalname.split('.')[0]
        cb(null, `${filename}-${Date.now()}.${ext}`);
    }

})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb('No es una imagen.', false);
    }
};

const uploadUser = multer({ storage: storageUser, fileFilter: multerFilter })

module.exports = {
    uploadUser
}