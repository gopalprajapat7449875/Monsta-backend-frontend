const mongoose = require('mongoose');

let Countrymodel = mongoose.Schema(
    {
        _CountryName: {
            type: String,
            required: [true,"please File CountryName"],
            match: [/^[a-zA-Z ]{2,20}$/,"please correct car.. value"]
        },
        _CountryCode: {
            type: String,
           required: [true,"please enter Country Code"]
        },
        _CountryOrder: {
            type: Number,
            required: true
        },
        _CountryStatus: {
            type: Boolean,
            default: true
        },
        _Country_Creted_to: {
            type: Date,
            default: new Date()
        },
        _Country_Updated_to: {
            type: Date,
            default: new Date()
        },
         _Country_Deleted_to: {
            type: Date,
            default:null
        }
        


    }
)
let CountryUseadd = mongoose.model("Country",Countrymodel)
module.exports=CountryUseadd