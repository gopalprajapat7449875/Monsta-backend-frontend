let express = require('express')

let SubCategoryRoutes = express.Router()
const multer = require("multer")
const { SubCategoryControlleradd, SubCategoryControllerview, SubCategoryControllerparent,SubCategoryControllerdelete,SubCategoryControllerchangestatus,Subcontrollersingledata,SubCategoryControllerupdate } = require('../../Controller/Admin/SubCategoryController')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload-files/subcategory")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + file.originalname)
    }
})

const uploadSub = multer({ storage: storage })




SubCategoryRoutes.post('/create', uploadSub.single("_image"),  SubCategoryControlleradd)
SubCategoryRoutes.get('/view',  SubCategoryControllerview)
SubCategoryRoutes.get('/parent',  SubCategoryControllerparent)
SubCategoryRoutes.post('/delete/', SubCategoryControllerdelete)
SubCategoryRoutes.post('/change-status', SubCategoryControllerchangestatus)
SubCategoryRoutes.get('/updatedata/:_id',Subcontrollersingledata )
SubCategoryRoutes.put('/update/:_id', uploadSub.single("_image"),SubCategoryControllerupdate)
module.exports={SubCategoryRoutes}