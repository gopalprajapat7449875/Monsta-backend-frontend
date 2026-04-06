const CategoryUseadd = require("../../Model/CatagoryModel")
const SubCategoryUseadd = require("../../Model/SubcategoryModel")




let SubCategoryControlleradd = async (req, res) => {



 let data = {...req.body}
    

    let {_SubCategoryName} = req.body

    if (_SubCategoryName != 'Anil') {


        var check = await SubCategoryUseadd.findOne({
            _SubCategoryName:_SubCategoryName,
            _SubCategory_Deleted_to: null
        })
    }

    if(req.file){
        if(req.file.filename){
            data['_image']=req.file.filename
        }
    }

    if (check) {
        let obj = {
            _status: false,
            _Message: 'SubCategory alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let Subcategoryres = await SubCategoryUseadd.insertOne(data)



            let obj = {
                _status: true,
                _Message: 'SubCategory add',
               
                Subcategoryres,
               

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

let SubCategoryControllerview = async (req, res) => {


    let nondeleted = {
        _SubCategory_Deleted_to: null
    }
    let SubCategoryres = await SubCategoryUseadd.find(nondeleted).populate("_PerentCategory","_CategoryName")
    let obj = {
        _status: true,
        _Message: 'Category view',
         _path : process.env.SUBMAINPATH,

        SubCategoryres
    }
    res.send(obj)
}

let SubCategoryControllerparent=async (req, res) => {


    let nondeleted = {
        _Category_Deleted_to: null,
        _CategoryStatus:true

    }
    let Categoryres = await CategoryUseadd.find(nondeleted).select('_CategoryName')
    let obj = {
        _status: true,
        _Message: 'Country view',
        Categoryres
    }
    res.send(obj)
}
let SubCategoryControllerdelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    SubCategoryUseadd.updateMany(
        { _id: _id }
        , {
            $set: {
                _SubCategory_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'SubCategory delete',
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
let SubCategoryControllerchangestatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    SubCategoryUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _SubCategoryStatus: {
                    $not: "$_SubCategoryStatus"
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
                _Message: 'SubCategory Status Changed successfully ',
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

let Subcontrollersingledata = async (req, res) => {
    let { _id } = req.params;

    let data = await SubCategoryUseadd.findById(_id)

    res.status(200).json({
        _status: true,
        _Message: 'Category Found',
        _path: process.env.SUBMAINPATH,
        data
    })
}
let SubCategoryControllerupdate = (req, res) => {
let data = { ...req.body }
    let { _id } = req.params;

    console.log(_id)
      if (req.file) {
        if (req.file.filename) {
            data['_image'] = req.file.filename
        }
    }
    SubCategoryUseadd.updateOne(
        { _id: _id }
        ,
        {
            $set: data
        }

    )
        .then((updateres) => {

            let obj = {
                _status: true,
                _Message: 'SubCategory updated',
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



module.exports ={SubCategoryControlleradd,SubCategoryControllerview,SubCategoryControllerparent,SubCategoryControllerdelete,SubCategoryControllerchangestatus,Subcontrollersingledata,SubCategoryControllerupdate}