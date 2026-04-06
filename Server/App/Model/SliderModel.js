const mongoose = require('mongoose');

let Slidermodel = mongoose.Schema(
    {
        _SliderTitle: {
            type: String,
            required: [true, "please File correct Categoryname"],
            match: [/^[a-zA-Z ]{2,100}$/, "please fill min. 2 and max 20 car value"]
        },

        _SliderOrder: {
            type: Number,
            required: true
        },
        _image: String,

        
        _SliderStatus: {
            type: Boolean,
            default: true
        },
        _Slider_Creted_to: {
            type: Date,
            default: new Date()
        },
        _Slider_Updated_to: {
            type: Date,
            default: new Date()
        },
        _Slider_Deleted_to: {
            type: Date,
            default: null
        }



    }
)
let SliderUseadd = mongoose.model("Slider", Slidermodel)
module.exports = SliderUseadd