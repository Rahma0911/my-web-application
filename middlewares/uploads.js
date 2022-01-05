const multer = require ("multer");
const path = require ("path");

const storage = multer.diskStorage({
    destination: "client/public/uploads",
    filename: function (req, file, cb) {
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize:1000000},
        fileFilter: function (req, file, cb) {
            const fileExtensions = /jpeg|jpg|png|gif/;
            const extname = fileExtensions.test(path.extname(file.originalname).toLowerCase());
            const mimeType = fileExtensions.test(file.mimetype);

            if (extname && mimeType) {
                return cb (null, true);
            } else {
                cb("Error: Images only.");
            }
        }
});

module.exports = upload;
