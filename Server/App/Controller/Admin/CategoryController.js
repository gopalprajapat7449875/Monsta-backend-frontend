const { createSlug } = require("../../Config/helper")
const CategoryUseadd = require("../../Model/CatagoryModel")



let CategoryControlleradd = async (req, res) => {



    let data = { ...req.body }


    let { _CategoryName } = req.body

    if (_CategoryName != 'Anil') {


        var check = await CategoryUseadd.findOne({
            _CategoryName: _CategoryName,
            _Category_Deleted_to: null
        })
    }

    if (req.file) {
        if (req.file.filename) {
            data['_image'] = req.file.filename
        }
    }


     //men
   let slug=createSlug(_CategoryName)

   data['_Slug']=slug
    if (check) {
        let obj = {
            _status: false,
            _Message: 'Category alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let categoryres = await CategoryUseadd.insertOne(data)



            let obj = {
                _status: true,
                _Message: 'Category add',

                categoryres,


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

let CategoryControllerview = async (req, res) => {


    let nondeleted = {
        _Category_Deleted_to: null
    }
    let Categoryres = await CategoryUseadd.find(nondeleted)
    let obj = {
        _status: true,
        _Message: 'Country view',
        _path: process.env.MAINPATH,

        Categoryres
    }
    res.send(obj)
}
let CategoryControllerdelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    CategoryUseadd.updateMany(
        { _id: _id }
        , {
            $set: {
                _Category_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'Category delete',
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
let CategoryControllerchangestatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    CategoryUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _CategoryStatus: {
                    $not: "$_CategoryStatus"
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
                _Message: 'Category Status Changed successfully ',
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

let controllersingledata = async (req, res) => {
    let { _id } = req.params;

    let data = await CategoryUseadd.findById(_id)

    res.status(200).json({
        _status: true,
        _Message: 'Category Found',
        _path: process.env.MAINPATH,
        data
    })
}
let CategoryControllerupdate = (req, res) => {
let data = { ...req.body }
    let { _id } = req.params;

    console.log(_id)
      if (req.file) {
        if (req.file.filename) {
            data['_image'] = req.file.filename
        }
    }
    CategoryUseadd.updateOne(
        { _id: _id }
        ,
        {
            $set: data
        }

    )
        .then((updateres) => {

            let obj = {
                _status: true,
                _Message: 'Category updated',
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

module.exports = { CategoryControlleradd, CategoryControllerview, CategoryControllerdelete, CategoryControllerchangestatus, controllersingledata, CategoryControllerupdate }