let express=require("express")
const {getProduct,  getProductDetail, getSlider } = require("../../Controller/Website/HomeController")


let HomeRoute=express.Router()

HomeRoute.get('/slider',getSlider)
 HomeRoute.get('/product',getProduct)
 HomeRoute.get('/product-details/:_Slug',getProductDetail)

module.exports={HomeRoute}