const OrderModel = require("../../Model/OrderModel");



let saveOrder = async (req, res) => {
  let orderData = { ...req.body };
  try {
    if (req.body._PaymentMethod == 1) {
      let order = await OrderModel.insertOne(orderData);

      //User userID for Clear Cart
      //   await cartModel.deleteOne({ userId: req.body.userId });

      res
        .status(200)
        .json({ _status: true, _message: "Order Placed Successfully" });
    } else if (req.body._PaymentMethod == 2) {
      //Backend Order Creare
      orderData._PaymentStatus = 1; //Pending
      orderData._OrderStatus = "pending";

      let order = await OrderModel.insertOne(orderData);
      //Razorpay Order Create

    //   var options = {
    //     amount: orderData.orderAmount * 100, // amount in the smallest currency unit
    //     currency: "INR",
    //     receipt: order._id.toString(),
    //   };
    //   let orderRes = await instance.orders.create(options);

    //   await orderModel.updateOne(
    //     { _id: order._id },
    //     { $set: { razorpayOrderId: orderRes.id } },
    //   );

    //   console.log(orderRes);

      //After Razorpay Order Create return ORDER ID and other details

    //   res
    //     .status(200)
    //     .json({
    //       _status: true,
    //       _message: "Order Placed Successfully, Please proceed to payment",
    //       orderRes,
    //     });
    }
  } catch (error) {
    // res
    //   .status(500)
    //   .json({
    //     _status: false,
    //     _message: "Something went wrong",
    //     error: error.message,
    //   });
  }
};

// let verfiyPayment = async (req, res) => {
//   let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
//   let sign = razorpay_order_id + "|" + razorpay_payment_id;
//   let expectedSign = crypto
//     .createHmac("sha256", "68E17CNWY8SemCvZ6ylOkuOY")
//     .update(sign.toString())
//     .digest("hex");

//   if (expectedSign === razorpay_signature) {
//     //Payment Success
//     await orderModel.updateOne(
//       { razorpayOrderId: razorpay_order_id },
//       {
//         $set: {
//           paymentStatus: "2",
//           razorpayPayment: razorpay_payment_id,
//           orderStatus: "process",
//         },
//       },
//     );
//     // await cartModel.deleteMany({ userId: req.body.userId });
//     res
//       .status(200)
//       .json({ _status: true, _message: "Payment verified successfully" });
//   }
// };
module.exports = { saveOrder };