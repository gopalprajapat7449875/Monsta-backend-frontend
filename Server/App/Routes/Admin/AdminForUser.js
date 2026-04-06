let express = require('express')
const { CategoryControlleradd, CategoryControllerview,CategoryControllerdelete,CategoryControllerchangestatus,controllersingledata,CategoryControllerupdate } = require('../../Controller/Admin/CategoryController')
const upload = require('../../Middleware/upload')
let CategoryRoutes = express.Router()
const multer = require("multer")



CategoryRoutes.post('/login', )
CategoryRoutes.post('/updatedata/', )

module.exports={CategoryRoutes}