let express = require('express')

let SubSubCategoryRoutes = express.Router()
const multer = require("multer")
const { SubCategoryControlleradd, SubCategoryControllerview, SubCategoryControllerparent,SubCategoryControllerdelete,SubCategoryControllerchangestatus,Subcontrollersingledata,SubCategoryControllerupdate } = require('../../Controller/Admin/SubCategoryController')
const { SubCategoryControllersubcategory, SubSubCategoryControlleradd, SubSubCategoryControllerview, SubSubCategoryControllerdelete, SubSubCategoryControllerchangestatus, SubSubcontrollersingledata, SubSubCategoryControllerupdate } = require('../../Controller/Admin/SubSubCategoryController')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload-files/subsubcategory")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + file.originalname)
    }
})

const uploadSub = multer({ storage: storage })


SubSubCategoryRoutes.post('/create', uploadSub.single("_image"),  SubSubCategoryControlleradd)
SubSubCategoryRoutes.get('/view',  SubSubCategoryControllerview)
SubSubCategoryRoutes.get('/parent',  SubCategoryControllerparent)
SubSubCategoryRoutes.post('/delete/', SubSubCategoryControllerdelete)
SubSubCategoryRoutes.post('/change-status', SubSubCategoryControllerchangestatus)
SubSubCategoryRoutes.get('/updatedata/:_id',SubSubcontrollersingledata )
SubSubCategoryRoutes.put('/update/:_id', uploadSub.single("_image"),SubSubCategoryControllerupdate)
SubSubCategoryRoutes.get('/subcategory/:_id', SubCategoryControllersubcategory)
module.exports={SubSubCategoryRoutes}