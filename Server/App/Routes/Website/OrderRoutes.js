let express=require("express")
const { CheckToken } = require("../../Middleware/CheckToken")
const { saveOrder } = require("../../Controller/Website/OrderController")


let OrderRoute=express.Router()

OrderRoute.post("/place-order",CheckToken,saveOrder)


module.exports={OrderRoute}

