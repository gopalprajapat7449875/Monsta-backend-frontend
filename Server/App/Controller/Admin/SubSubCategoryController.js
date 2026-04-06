const CategoryUseadd = require("../../Model/CatagoryModel")
const SubCategoryUseadd = require("../../Model/SubcategoryModel")
const SubSubCategoryUseadd = require("../../Model/SubSubCategoryModel")





let SubSubCategoryControlleradd = async (req, res) => {



    let data = { ...req.body }


    let { _SubSubCategoryName } = req.body

    if (_SubSubCategoryName != 'Anil') {


        var check = await SubSubCategoryUseadd.findOne({
            _SubSubCategoryName: _SubSubCategoryName,
            _SubSubCategory_Deleted_to: null
        })
    }

    if (req.file) {
        if (req.file.filename) {
            data['_image'] = req.file.filename
        }
    }

    if (check) {
        let obj = {
            _status: false,
            _Message: 'SubSubCategory alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let SubSubcategoryres = await SubSubCategoryUseadd.insertOne(data)



            let obj = {
                _status: true,
                _Message: 'SubCategory add',

                SubSubcategoryres,


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
let SubSubCategoryControllerview = async (req, res) => {


    let nondeleted = {
        _SubSubCategory_Deleted_to: null
    }
    let SubSubCategoryres = await SubSubCategoryUseadd.find(nondeleted).populate([
        {
            path: "_PerentCategory",
            select: "_CategoryName"
        },
        {
            path: "_SubCategory",
            select: "_SubCategoryName"
        }
    ])
    let obj = {
        _status: true,
        _Message: 'sub sub Category view',
        _path: process.env.SUBSUBMAINPATH,

        SubSubCategoryres
    }
    res.send(obj)
}
let SubCategoryControllerparent = async (req, res) => {


    let nondeleted = {
        _Category_Deleted_to: null,
        _CategoryStatus: true

    }
    let Categoryres = await CategoryUseadd.find(nondeleted).select('_CategoryName')
    let obj = {
        _status: true,
        _Message: 'Country view',
        Categoryres
    }
    res.send(obj)
}
let SubCategoryControllersubcategory = async (req, res) => {

    let { _id } = req.params

    let nondeleted = {
        _PerentCategory: _id,
        _SubCategory_Deleted_to: null,
        _SubCategoryStatus: true

    }
    let Categoryres = await SubCategoryUseadd.find(nondeleted).select('_SubCategoryName')
    let obj = {
        _status: true,
        _Message: 'Sub Country view',
        Categoryres
    }
    res.send(obj)
}
let SubSubCategoryControllerdelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    SubSubCategoryUseadd.updateMany(
        { _id: _id }
        , {
            $set: {
                _SubSubCategory_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'SubSubCategory delete',
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
let SubSubCategoryControllerchangestatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    SubSubCategoryUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _SubSubCategoryStatus: {
                    $not: "$_SubSubCategoryStatus"
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
                _Message: 'SubSubCategory Status Changed successfully ',
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
let SubSubcontrollersingledata = async (req, res) => {
    let { _id } = req.params;

    let data = await SubSubCategoryUseadd.findById(_id).populate([
        {
            path: "_PerentCategory",
            select: "_CategoryName"
        },
        {
            path: "_SubCategory",
            select: "_SubCategoryName"
        }
    ])

    res.status(200).json({
        _status: true,
        _Message: 'Sub Sub Category Found',
        _path: process.env.SUBSUBMAINPATH,
        data
    })
}
let SubSubCategoryControllerupdate = (req, res) => {
    let data = { ...req.body }
    let { _id } = req.params;

    console.log(_id)
    if (req.file) {
        if (req.file.filename) {
            data['_image'] = req.file.filename
        }
    }
    SubSubCategoryUseadd.updateOne(

        { _id: _id }
        ,
        {
            $set: data
        }

    )
        .then((updateres) => {

            let obj = {
                _status: true,
                _Message: 'SubSubCategory updated',
                updateres
            }

            res.send(obj)
        })
        .catch((err) => {

            console.log(err)

            let obj = {
                _status: false,
                _Message: 'Update failed',
                error: err.message
            }

            res.send(obj)
        })
}



module.exports = { SubSubCategoryControlleradd, SubSubCategoryControllerview, SubCategoryControllerparent, SubSubCategoryControllerdelete, SubSubCategoryControllerchangestatus, SubSubcontrollersingledata, SubSubCategoryControllerupdate, SubCategoryControllersubcategory }