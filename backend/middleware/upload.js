const multer = require("multer");


const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        console.log('Je suis le  YANKEE if de upload.js');
        cb(null, true);
    } else {
        console.log('Je suis le  YANKEE else de upload.js');
        cb("Please upload only images.", false);
    }
};
console.log('Je suis le  YANKEE else de upload.js');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        let name = `${Date.now()}-Shehryar-${file.originalname}`
        req.body.fingerPrints = name
        cb(null, name);
    },
});
console.log('Je suis le  YANKEE else de upload.js');

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;