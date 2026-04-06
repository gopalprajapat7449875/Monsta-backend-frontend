let express = require('express')
// const { SliderControlleradd, SliderControllerview, SliderControllerdelete, SliderControllerchangestatus, controllersingledata, SliderControllerupdate } = require('../../Controller/Admin/SliderController')

let SliderRoutes = express.Router()
const multer = require("multer")
const { SliderControlleradd, SliderControllerview,Slidercontrollersingledata, SliderControllerdelete, SliderControllerchangestatus, SliderControllerupdate } = require('../../Controller/Admin/SliderController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload-files/slider")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + file.originalname)
    }
})

const uploadSub = multer({ storage: storage })


SliderRoutes.post('/create', uploadSub.single("_image"),  SliderControlleradd)
SliderRoutes.get('/view',  SliderControllerview)
SliderRoutes.post('/delete/', SliderControllerdelete)
SliderRoutes.post('/change-status', SliderControllerchangestatus)
SliderRoutes.get('/updatedata/:_id',Slidercontrollersingledata )
SliderRoutes.put('/update/:_id', uploadSub.single("_image"),SliderControllerupdate)
module.exports={SliderRoutes}