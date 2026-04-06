const ProductUseadd = require("../../Model/ProductModel");
const SliderUseadd = require("../../Model/SliderModel");

let getProduct = async (req, res) => {

    let filter = {
        _Product_Deleted_to: null,

        _ProductStatus: true,
    };
    let productres = await ProductUseadd
        .find(filter)
        .populate([
            {
                path: "_PerentCategory",
                select: "_CategoryName"
            },
            {
                path: "_SubCategory",
                select: "_SubCategoryName"
            },
            {
                path: "_SubSubCategory",
                select: "_SubSubCategoryName"
            },
            {
                path: "_Material",
                select: "_MetarialName"
            },
            {
                path: "_Color",
                select: "_ColorName"
            }
        ])

    let obj = {
        _status: true,
        _message: "Product View ",
        _Path: process.env.PRODUCTMAINPATH,
        productres,
    }
    res.send(obj);
}


let getProductDetail = async (req, res) => {
    let { _Slug } = req.params


    let filter = {
        _Product_Deleted_to: null,
        _Slug:_Slug,
        _ProductStatus: true,
    };
    let productres = await ProductUseadd
        .findOne(filter)
        .populate([
            {
                path: "_PerentCategory",
                select: "_CategoryName"
            },
            {
                path: "_SubCategory",
                select: "_SubCategoryName"
            },
            {
                path: "_SubSubCategory",
                select: "_SubSubCategoryName"
            },
            {
                path: "_Material",
                select: "_MetarialName"
            },
            {
                path: "_Color",
                select: "_ColorName"
            }
        ])

    let obj = {
        _status: true,
        _message: "Product View ",
        _Path: process.env.PRODUCTMAINPATH,
        productres,
    }
    res.send(obj);
}
let getSlider = async (req, res) => {

    let filter = {
        _Slider_Deleted_to: null,
        _SliderStatus: true

    }
    let Sliderres = await SliderUseadd.find(filter)
    let obj = {
        _status: true,
        _Message: 'Slider view',
        _path: process.env.SLIDERMAINPATH,

        Sliderres
    }
    res.send(obj)
}

module.exports = { getProduct, getProductDetail, getSlider }