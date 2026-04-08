const CartModelUse = require("../../Model/CartModel");


let AddToCartProduct = async (req, res) => {


    let { _UserId, _ProductID, _ProductPrice } = req.body
    let data = { ...req.body }

    let filter = {
        _UserId: _UserId,
        _ProductID: _ProductID
    }


    let check = await CartModelUse.findOne(filter)

    console.log(check)
    if (check) {
        await CartModelUse.updateOne(
            {

                _id: check._id

            },
            {
                $set: {
                    _Quantity: check._Quantity + 1,

                    _ProductPrice: check._ProductPrice + _ProductPrice
                }
            }
        )
    }
    else {
        let cartres = await CartModelUse.insertOne(data)

    }



    let obj = {
        _status: true,
        _message: "Product Add",


    }
    res.send(obj);
}
let CartProduct = async (req, res) => {

    let { _UserId } = req.body



    let filter = {
        _UserId: _UserId
    }


    let cartres = await CartModelUse.find(filter)


    let obj = {
        _status: true,
        _message: "Product Add",
        _Path: process.env.PRODUCTMAINPATH,
        cartres,
    }
    res.send(obj);
}
let CartProductUpdate = async (req, res) => {

    try {
        let { _UserId, productData } = req.body;

        console.log(req.body)



        for (let item of productData) {

            let filter = {
                _UserId: _UserId,
                _ProductID: item.id
            };

            let cartres = await CartModelUse.findOne(filter);

            if (cartres) {

                // new quantity
                let newQty = item.quantity;

                // unit price nikal lo (important)
                let unitPrice = cartres._ProductPrice / cartres._Quantity;

                // new total price
                let newPrice = unitPrice * newQty;

                await CartModelUse.updateOne(
                    {
                        _UserId: _UserId,
                        _ProductID: item.id
                    },
                    {
                        $set: {
                            _Quantity: newQty,
                            _ProductPrice: newPrice
                        }
                    }
                );
            }
        }

        res.send({
            _status: true,
            _message: "Cart Updated Successfully"
        });

    } catch (error) {
        console.log(error);
        res.send({
            _status: false,
            _message: "Server Error"
        });
    }
};

//     let { _UserId, _id, _Quantity } = req.body

//     console.log(req.body)

//     let filter = {
//         _UserId: _UserId,

//         _ProductID: _id
//     }



//     let cartres = await CartModelUse.findOne(filter)


//     if (cartres) {


//         if (cartres._Quantity == 1) {
//             await CartModelUse.updateOne(
//                 {

//                     _ProductID: _id

//                 },
//                 {
//                     $set: {
//                         _Quantity: cartres._Quantity + _Quantity,

//                         _ProductPrice: cartres._ProductPrice*2
//                     }
//                 }
//             )
//         }
//         else{


//              await CartModelUse.updateOne(
//                 {

//                     _ProductID: _id

//                 },
//                 {
//                     $set: {
//                         _Quantity: cartres._Quantity + _Quantity,

//                         _ProductPrice: cartres._ProductPrice/cartres._Quantity*_Quantity
//                     }
//                 }
//             )
//         }

//     }

//     let obj = {
//         _status: true,
//         _message: "Cart Updated",

//     }
//     res.send(obj);
// }

let deleteitem = async (req, res) => {
    let { _UserId, _id } = req.body

console.log(req.body)
    try {
        let check = {
            _UserId: _UserId,
            _id:_id
        };
        let checkres = await CartModelUse.findOne(check)

        if (checkres) {
            await CartModelUse.deleteOne({_id:_id})
        }
        res.send({
            _status: true,
            _message: "Cart Item deleted Successfully"
        });


    }
    catch (error) {
        console.log(error);
        res.send({
            _status: false,
            _message: "Server Error"
        });
    }




}


module.exports = { CartProduct, AddToCartProduct, CartProductUpdate, deleteitem }