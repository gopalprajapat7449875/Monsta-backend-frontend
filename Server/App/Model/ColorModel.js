const mongoose = require('mongoose');

let colormodel = mongoose.Schema(
    {
        _ColorName: {
            type: String,
            required: [true,"please File correct colorname"],
            match: [/^[a-zA-Z ]{2,20}$/,"please fill min. 2 and max 20 car value"]
        },
        _ColorCode: {
            type: String,
            required: [true,"please enter color code"]
        },
        _ColorOrder: {
            type: Number,
            required: true
        },
        _ColorStatus: {
            type: Boolean,
            default: true
        },
        _Color_Creted_to: {
            type: Date,
            default: new Date()
        },
        _Color_Updated_to: {
            type: Date,
            default: new Date()
        },
         _Color_Deleted_to: {
            type: Date,
            default:null
        }
        


    }
)
let ColorUseadd = mongoose.model("color",colormodel)
module.exports=ColorUseadd