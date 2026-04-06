let express=require("express")
const { AddToCartProduct, CartProduct } = require("../../Controller/Website/CartController")
const multer = require("multer")
const { FileUpload } = require("../../Middleware/Fileupload")
const { CheckToken } = require("../../Middleware/CheckToken")


const storage = FileUpload("cartimages")
const upload = multer({ storage: storage })



let CartRoutes=express.Router()
CartRoutes.post('/addtocart', CheckToken, upload.single("_ProductImage"),AddToCartProduct)
CartRoutes.post('/cartitem', CheckToken,CartProduct)
module.exports={CartRoutes}