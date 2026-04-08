let mongoose = require('mongoose');
let OrderSchema = new mongoose.Schema(
    {
        _OrderItems: [],
        //orderItems:[
        //     {    
        //     productId: { type: mongoose.Types.ObjectId, ref: "product" },
        //     productName: { type: String },
        //     productPrice: { type: Number },  
        //      },
        _ShippingAddess: {
            type: Object,
        },
        _OrderID: {
            type: String,
        },
        _PaymentMethod: {
            type: String,
            enum: ["1", "2"], // 1 Cash on delivery, 2 Online payment
            default: '1'
        },
        _PaymentStatus: {
            type: String,
            enum: ["1", "2", "3"], //Pending
            default: 1,

        },
        _RazorpayOrderId: {
            type: String,
        },
        _RazorpayPayment: { //razorpayPayment 
            type: String,
        },
        _OrderAmount: {
            type: Number,
        },
        _OrderQty: {
            type: Number,
        },
        _ShippingCharges: {
            type: Number,
        },
        _OrderStatus: {
            type: String,
            enum: ["pending", "process", "completed"], //
            default: 'pending'
        },

        _UserId: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        }
    }, {
    _Timestamps: true
})


let OrderModel = mongoose.model("order", OrderSchema)

module.exports = OrderModel;