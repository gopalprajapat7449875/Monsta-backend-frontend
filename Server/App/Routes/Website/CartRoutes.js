let express=require("express")
const { AddToCartProduct, CartProduct, CartProductUpdate, deleteitem } = require("../../Controller/Website/CartController")
const multer = require("multer")
const { FileUpload } = require("../../Middleware/Fileupload")
const { CheckToken } = require("../../Middleware/CheckToken")


const storage = FileUpload("cartimages")
const upload = multer({ storage: storage })



let CartRoutes=express.Router()
CartRoutes.post('/addtocart', CheckToken,AddToCartProduct)
CartRoutes.post('/cartitem', CheckToken,CartProduct)
CartRoutes.post('/updatecart', CheckToken,CartProductUpdate)
CartRoutes.post('/deleteitem', CheckToken,deleteitem)
module.exports={CartRoutes}