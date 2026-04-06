const mongoose = require('mongoose');

let Productmodel = mongoose.Schema(
    {
        _ProductName: {
            type: String,
            required: [true, "please File correct Categoryname"],

        },
        _Product_Width: {
            type: Number,
            required: true
        },
        _Product_Length: {
            type: Number,
            required: true
        },
        _Product_Hight: {
            type: Number,
            required: true
        },

        _Product_Short_Description: {
            type: String,
            required: [true, "please File correct _Product_Short_Description"],

        },
        _Product_Long_Description: {
            type: String,
            required: [true, "please File correct _Product_Long_Description"],

        },
        _Meta_Title: {
            type: String,
            required: [true, "please File correct _Meta_Title"],

        },
        _Meta_Discrition: {
            type: String,
            required: [true, "please File correct _Meta_Discrition"],

        },
        _Meta_Slug: {
            type: String,
            required: [true, "please File correct _Meta_Slug"],

        },

        _PerentCategory: {

            type: String,
            ref: "category"
        },
        _SubCategory: {

            type: String,
            ref: "subcategory"
        },
        _SubSubCategory: {

            type: String,
            ref: "subsubcategory"
        },
        _Prodcut_Type: {
            type: String,
            enum: [1, 2, 3], // Allowed values
            default: 1,
        },
        _Product_Best_Selling: {
            type: Boolean,

            default: true,
        },
        _Product_Top_Rated: {
            type: Boolean,

            default: true,
        },





        _Material:
            [
                {
                    type: String,
                    ref: "Metarial"

                }],

        _Color: [
            {
                type: String,
                ref: "color"

            }],
        _ProductOrder: {
            type: Number,
            required: true
        },
        _Product_Original_Price: {
            type: Number,
            required: true
        },
        _Product_Discount_Price: {
            type: Number,
            required: true
        },
        _Product_Sell_Price: {
            type: Number,
            required: true
        },

        _image: String,
        _Gallery_image: [],

        _Slug: String,

        _ProductStatus: {
            type: Boolean,
            default: true
        },
        _Product_Creted_to: {
            type: Date,
            default: new Date()
        },
        _Product_Updated_to: {
            type: Date,
            default: new Date()
        },
        _Product_Deleted_to: {
            type: Date,
            default: null
        }



    }
)
let ProductUseadd = mongoose.model("Product", Productmodel)
module.exports = ProductUseadd