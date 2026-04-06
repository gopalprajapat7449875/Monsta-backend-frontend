let express = require('express')
const { UserCreate, UserLogin, ChangePassaword, ForgotPassaword, ChangePassawordBeforeLogin, Userdata, UserUpdate } = require('../../Controller/Website/UserController')

let UserRoutes = express.Router()

const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload-files/userimages")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + file.originalname)
    }
})

const uploadSub = multer({ storage: storage })




UserRoutes.post('/create',UserCreate)
UserRoutes.post('/login',UserLogin)
UserRoutes.post('/change-password',ChangePassaword)
UserRoutes.post('/forgot-password',ForgotPassaword)
UserRoutes.post('/reset-password/:id',ChangePassawordBeforeLogin)
UserRoutes.post('/user-data',Userdata)
UserRoutes.post('/update' ,uploadSub.single("_ProfilePic"),UserUpdate)


module.exports={UserRoutes}