const mongoose = require('mongoose');

let Metarialmodel = mongoose.Schema(
    {
        _MetarialName: {
            type: String,
           required: [true,"please File MaterialName"],
            match: [/^[a-zA-Z ]{2,20}$/,"please correct car.. value"]
        },
        _MetarialCode: {
            type: String,
           required: [true,"please enter Material Code"]
        },
        _MetarialOrder: {
            type: Number,
            required: true
        },
        _MetarialStatus: {
            type: Boolean,
            default: true
        },
        _Metarial_Creted_to: {
            type: Date,
            default: new Date()
        },
        _Metarial_Updated_to: {
            type: Date,
            default: new Date()
        },
         _Metarial_Deleted_to: {
            type: Date,
            default:null
        }
        


    }
)
let MetarialUseadd = mongoose.model("Metarial",Metarialmodel)
module.exports=MetarialUseadd