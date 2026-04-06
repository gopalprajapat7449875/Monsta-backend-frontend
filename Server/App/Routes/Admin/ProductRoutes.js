let express = require('express')
const { FileUpload } = require('../../Middleware/Fileupload')
let ProductRoutes = express.Router()
const multer = require("multer")
const { ProductControlleradd, ProductControllerparent, ProductSubCategoryController, ProductSubSubCategoryController, ProductControllerColor, ProductControllerMaterial, ProductView, ProductDetailsView, ProductControllerdelete, ProductControllerchangestatus, ProductSingleView, ProductControllerUpdate } = require('../../Controller/Admin/ProductController')
const storage = FileUpload("product")

const upload = multer({ storage: storage })


ProductRoutes.post('/create', upload.fields([{ name: '_image', maxCount: 1 }, {

    name: '_Gallery_image', maxCount: 20
}]), ProductControlleradd)
ProductRoutes.get('/view', ProductView)
ProductRoutes.get('/view/:slug', ProductDetailsView)
ProductRoutes.get('/parent', ProductControllerparent)
ProductRoutes.get('/subcategory/:_id', ProductSubCategoryController)
ProductRoutes.get('/subsubcategory/:_id', ProductSubSubCategoryController)
ProductRoutes.get('/metarial', ProductControllerMaterial)
ProductRoutes.get('/color', ProductControllerColor)
ProductRoutes.post('/delete', ProductControllerdelete)
ProductRoutes.post('/change-status', ProductControllerchangestatus)
ProductRoutes.get('/updateview/:_id', ProductSingleView)
ProductRoutes.put('/update/:_id', upload.fields([{ name: '_image', maxCount: 1 }, {

    name: '_Gallery_image', maxCount: 20
}]), ProductControllerUpdate)
module.exports = { ProductRoutes }