const multer = require('multer');
const path = require('path');

const ALLOWED_UPLOAD_DIRS = ['logoParceiro', 'logoCertificado', 'imgCertificado', 'logoCashBack', 'descImagem', 'promocao'];

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (req.query.local && ALLOWED_UPLOAD_DIRS.includes(req.query.local)) {
                cb(null, path.join(__dirname, `../public/upload/img/${req.query.local}`));
            } else {
                cb(null, path.join(__dirname, '../public/upload/img/'));
            }
        },
        filename: (req, file, cb) => {
            //cb(null, Date.now().toString() + "_" + file.originalname) 


            if (req.query.local == 'logoParceiro') {
                if (req.query.cod) {
                    cb(null, req.query.cod + "_" + Date.now().toString() + path.extname(file.originalname));
                } else {
                    cb(null, "new_" + Date.now().toString() + path.extname(file.originalname));
                }

            } else if (req.query.local == "logoCertificado") {
                if (req.query.cod) {
                    cb(null, req.query.cod + "_" + Date.now().toString() + path.extname(file.originalname));
                } else {
                    cb(null, "new_" + Date.now().toString() + path.extname(file.originalname));
                }
            } else if (req.query.local == "imgCertificado") {
                if (req.query.cod) {
                    cb(null, req.query.cod + "_" + Date.now().toString() + path.extname(file.originalname));
                } else {
                    cb(null, "new_" + Date.now().toString() + path.extname(file.originalname));
                }
            } else if (req.query.local == "logoCashBack") {
                if (req.query.cod) {
                    cb(null, req.query.cod + "_" + Date.now().toString() + path.extname(file.originalname));
                } else {
                    cb(null, "new_" + Date.now().toString() + path.extname(file.originalname));
                }
            } else if (req.query.local == "descImagem") {
                if (req.query.cod) {
                    cb(null, req.query.cod + "_" + Date.now().toString() + path.extname(file.originalname));
                } else {
                    cb(null, "new_" + Date.now().toString() + path.extname(file.originalname));
                }
            } else if (req.query.local == "promocao") {
                if (req.query.cod) {
                    cb(null, req.query.cod + "_" + Date.now().toString() + path.extname(file.originalname));
                } else {
                    cb(null, "new_" + Date.now().toString() + path.extname(file.originalname));
                }
            } else {
                cb(null, file.originalname);
            }
            //cb(null, file.originalname) 


        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if (extensaoImg) {
            return cb(null, true);
        }

        return cb(null, false);
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max
    }
}));