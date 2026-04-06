

const { createSlug } = require("../../Config/helper")
const CategoryUseadd = require("../../Model/CatagoryModel")
const ColorUseadd = require("../../Model/ColorModel")
const MetarialUseadd = require("../../Model/MaterialModel")
const ProductUseadd = require("../../Model/ProductModel")
const SubCategoryUseadd = require("../../Model/SubcategoryModel")
const SubSubCategoryUseadd = require("../../Model/SubSubCategoryModel")

let ProductControlleradd = async (req, res) => {



    let data = { ...req.body }


    let { _ProductName } = req.body




    var check = await ProductUseadd.findOne({
        _ProductName: _ProductName,
        _Product_Deleted_to: null
    })


    if (req.files) {
        if (req.files._image) {
            data['_image'] = req.files._image[0].filename;
        }

        if (req.files._Gallery_image) {
            data['_Gallery_image'] = req.files._Gallery_image.map(file => file.filename);
        }
    }


    //men
    let slug = createSlug(_ProductName)

    data['_Slug'] = slug
    if (check) {
        let obj = {
            _status: false,
            _Message: 'Product alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let productres = await ProductUseadd.insertOne(data)



            let obj = {
                _status: true,
                _Message: 'Product add',

                productres,


            }
            res.send(obj)


        }
        catch (err) {

            console.log(err);

            let errorrs = err.errors
            let erre = []
            for (let key in errorrs) {
                let errobj = {}
                errobj[key] = errorrs[key].message
                erre.push(errobj)

            }
            let obj = {
                _status: false,
                erre
            }
            res.send(obj)

        }
    }
}
let ProductView = async (req, res) => {

    let nondeleted = {
        _Product_Deleted_to: null
    }
    let productres = await ProductUseadd.find(nondeleted).populate([
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
        _Message: 'Product view',
        _Path: process.env.PRODUCTMAINPATH,
        productres
    }
    res.send(obj)

}
let ProductDetailsView = async (req, res) => {
    let { slug } = req.params
    let nondeleted = {
        _Slug: slug,
        _Product_Deleted_to: null
    }
    let dproductres = await ProductUseadd.findOne(nondeleted).populate([
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
        _Message: 'Product view',
        _Path: process.env.PRODUCTMAINPATH,
        dproductres
    }
    res.send(obj)





}
let ProductControllerparent = async (req, res) => {


    let nondeleted = {
        _Category_Deleted_to: null,
        _CategoryStatus: true

    }
    let Productres = await CategoryUseadd.find(nondeleted).select('_CategoryName')
    let obj = {
        _status: true,
        _Message: 'Product view',
        Productres
    }
    res.send(obj)
}
let ProductSubCategoryController = async (req, res) => {

    let { _id } = req.params
    console.log(_id)

    let nondeleted = {
        _PerentCategory: _id,
        _SubCategory_Deleted_to: null,
        _SubCategoryStatus: true

    }
    let SubCategoryres = await SubCategoryUseadd.find(nondeleted).select('_SubCategoryName')
    let obj = {
        _status: true,
        _Message: 'Sub Country view',
        SubCategoryres
    }
    res.send(obj)
}
let ProductSubSubCategoryController = async (req, res) => {

    let { _id } = req.params

    let nondeleted = {
        _SubCategory: _id,
        _SubSubCategory_Deleted_to: null,
        _SubSubCategoryStatus: true

    }
    let subsubCategoryres = await SubSubCategoryUseadd.find(nondeleted).select('_SubSubCategoryName')
    let obj = {
        _status: true,
        _Message: 'Sub sub category view',
        subsubCategoryres
    }
    res.send(obj)
}
let ProductControllerColor = async (req, res) => {


    let nondeleted = {
        _Color_Deleted_to: null,
        _ColorStatus: true

    }
    let colorres = await ColorUseadd.find(nondeleted).select('_ColorName')
    let obj = {
        _status: true,
        _Message: 'color view',
        colorres
    }
    res.send(obj)
}
let ProductControllerMaterial = async (req, res) => {


    let nondeleted = {
        _Metarial_Deleted_to: null,
        _MetarialStatus: true

    }
    let Metarialres = await MetarialUseadd.find(nondeleted).select('_MetarialName')
    let obj = {
        _status: true,
        _Message: 'Product view',
        Metarialres
    }
    res.send(obj)
}
let ProductControllerdelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    await ProductUseadd.updateMany(
        { _id: _id }
        , {
            $set: {
                _Product_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'Product delete',
                ress
            }
            res.send(obj)
        })
        .catch((err) => {
            let obj = {
                _status: false,
                _Message: err.errors,

            }
            res.send(obj)
        })


}
let ProductControllerchangestatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    await ProductUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _ProductStatus: {
                    $not: "$_ProductStatus"
                }
            }
        }],
        {
            updatePipeline: true
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'Product Status Changed successfully ',
                ress
            }
            res.send(obj)
        })
        .catch((err) => {
            let obj = {
                _status: false,
                _Message: err.errors,

            }
            res.send(obj)
        })


}
let ProductSingleView = async (req, res) => {


    let { _id } = req.params
    let nondeleted = {
        _id: _id
    }
    let productres = await ProductUseadd.findOne(nondeleted).populate([
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
        _Message: 'Product view',
        _Path: process.env.PRODUCTMAINPATH,
        productres
    }
    res.send(obj)

}
let ProductControllerUpdate = async (req, res) => {


    let { _id } = req.params
    let data = { ...req.body }


    let { _ProductName } = req.body




    var check = await ProductUseadd.findOne({
        _ProductName: _ProductName,
        _Product_Deleted_to: null
    })


    if (req.files) {
        if (req.files._image) {
            data['_image'] = req.files._image[0].filename;
        }

        if (req.files._Gallery_image) {
            data['_Gallery_image'] = req.files._Gallery_image.map(file => file.filename);
        }
    }


    //men
    let slug = createSlug(_ProductName)

    data['_Slug'] = slug
    if (check) {
        let obj = {
            _status: false,
            _Message: 'Product alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let productres = await ProductUseadd.updateOne(
                { _id: _id }
                ,
                {
                    $set: data
                }

            )


            let obj = {
                _status: true,
                _Message: 'Product Updated',

                productres,


            }
            res.send(obj)


        }
        catch (err) {

            console.log(err);

            let errorrs = err.errors
            let erre = []
            for (let key in errorrs) {
                let errobj = {}
                errobj[key] = errorrs[key].message
                erre.push(errobj)

            }
            let obj = {
                _status: false,
                erre
            }
            res.send(obj)

        }
    }
}
module.exports = { ProductControlleradd, ProductControllerparent, ProductSubCategoryController, ProductSubSubCategoryController, ProductControllerColor, ProductControllerMaterial, ProductView, ProductDetailsView, ProductControllerdelete, ProductControllerchangestatus, ProductSingleView,ProductControllerUpdate }