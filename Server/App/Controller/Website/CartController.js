const CartModelUse = require("../../Model/CartModel");


let AddToCartProduct = async (req, res) => {

   


    let cartres = await CartModelUse.insertOne(req.body)
        

    let obj = {
        _status: true,
        _message: "Product Add",

        
    }
    res.send(obj);
}
let CartProduct = async (req, res) => {

   let {UserId}=req.body

    console.log(UserId);
    
    let filter={
        UserId:UserId
    }


    let cartres = await CartModelUse.find(filter)
        

    let obj = {
        _status: true,
        _message: "Product Add",
        _Path: process.env.CARTPRODUCTMAINPATH,
        cartres,
    }
    res.send(obj);
}
module.exports = {CartProduct,AddToCartProduct }