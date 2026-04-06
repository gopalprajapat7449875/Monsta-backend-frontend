const mongoose = require('mongoose');

let SubSubCategorymodel = mongoose.Schema(
    {
        _SubSubCategoryName: {
            type: String,
            required: [true, "please File correct Categoryname"],
            match: [/^[a-zA-Z ]{2,100}$/, "please fill min. 2 and max 20 car value"]
        },

        _SubSubCategoryOrder: {
            type: Number,
            required: true
        },
        _image: String,

        _Slug: String,

        _PerentCategory: {

            type: String,
            ref: "category"
        },

          _SubCategory: {

            type: String,
            ref: "subcategory"
        },

        _SubSubCategoryStatus: {
            type: Boolean,
            default: true
        },
        _SubSubCategory_Creted_to: {
            type: Date,
            default: new Date()
        },
        _SubSubCategory_Updated_to: {
            type: Date,
            default: new Date()
        },
        _SubSubCategory_Deleted_to: {
            type: Date,
            default: null
        }



    }
)
let SubSubCategoryUseadd = mongoose.model("subsubcategory", SubSubCategorymodel)
module.exports = SubSubCategoryUseadd