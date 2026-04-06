
const multer = require("multer")

let FileUpload=(folder)=>
    multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "upload-files/"+folder)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now()  + file.originalname)
        }
    })
    
module.exports = {FileUpload}