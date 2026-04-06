let express = require('express')
const { CategoryControlleradd, CategoryControllerview,CategoryControllerdelete,CategoryControllerchangestatus,controllersingledata,CategoryControllerupdate } = require('../../Controller/Admin/CategoryController')
const upload = require('../../Middleware/upload')
let CategoryRoutes = express.Router()
const multer = require("multer")


CategoryRoutes.post('/create', upload.single("_image"),  CategoryControlleradd)
CategoryRoutes.get('/view',  CategoryControllerview)
CategoryRoutes.post('/delete/', CategoryControllerdelete)
CategoryRoutes.post('/change-status', CategoryControllerchangestatus)
CategoryRoutes.get('/updatedata/:_id',controllersingledata )
CategoryRoutes.put('/update/:_id', upload.single("_image"),CategoryControllerupdate)
module.exports={CategoryRoutes}