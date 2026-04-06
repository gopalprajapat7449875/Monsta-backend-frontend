const mongoose = require('mongoose');

let Sizemodel = mongoose.Schema(
    {
        _SizeName: {
            type: String,
            required: true
        },
        _Width: {
            type: Number,
            required: true
        },
        _Length: {
            type: Number,
            required: true
        },
        _Hight: {
            type: Number,
            required: true
        },
        _SizeOrder: {
            type: Number,
            required: true
        },
        _SizeStatus: {
            type: Boolean,
            default: true
        },
        _Size_Creted_to: {
            type: Date,
            default: new Date()
        },
        _Size_Updated_to: {
            type: Date,
            default: new Date()
        },
        _Size_Deleted_to: {
            type: Date,
            default: null
        }



    }
)
let SizeUseadd = mongoose.model("Size", Sizemodel)
module.exports = SizeUseadd