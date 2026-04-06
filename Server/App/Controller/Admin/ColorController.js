// const ColorUseadd = require("../Model/ColorModel")

const ColorUseadd = require("../../Model/ColorModel")

let controllercoloradd = async (req, res) => {


    let { _ColorName } = req.body

    if (_ColorName != 'Anil') {


        var check = await ColorUseadd.findOne({
            _ColorName: _ColorName,
            _Color_Deleted_to: null
        })
    }

    if (check) {
        let obj = {
            _status: false,
            _Message: 'Color alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let colorres = await ColorUseadd.insertOne(req.body)



            let obj = {
                _status: true,
                _Message: 'Color add',
                colorres
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
let controllercolorview = async (req, res) => {


    let nondeleted = {
        _Color_Deleted_to: null
    }

    let a =req.query.name
    console.log(a)

    let page = req.query.page||1
    let limit = req.query.limit || 10
    let skip = (page-1)*limit

    let searchobj ={}
    if(req.query.name&&req.query.name.trim()!==''){
        searchobj['name'] = {$regex:req.quiry.name,$option:"i"};

    }
    const Finalview = await ColorUseadd.countDocuments(searchobj);

    let colorres = await ColorUseadd.find(nondeleted,searchobj)


    .skip(skip)
    .limit(limit)
    .sort({Order:1})

    let obj = {
        _status: true,
        _Message: 'Color view',
        _Total_page : Math.ceil(Finalview/limit),
        Finalview,
        colorres
    }
    res.send(obj)
}
let controllercolordelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    ColorUseadd.updateMany(
        { _id: _id }
        , {
            $set: {
                _Color_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'Color delete',
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
let controllercolorchangesatatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    ColorUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _ColorStatus: {
                    $not: "$_ColorStatus"
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
                _Message: 'Color Status Changed successfully ',
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

    let data = await ColorUseadd.findById(_id)

    res.status(200).json({
        _status: true,
        _Message: 'Color Found',
        data
    })
}
let controllercolorupdate = (req, res) => {

    let { _id } = req.params;

console.log(_id)
    ColorUseadd.updateOne(
        {_id:_id }
        ,
        {
            $set: req.body
        }

    )
        .then((updateres) => {

            let obj = {
                _status: true,
                _Message: 'Color updated',
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
module.exports = { controllercoloradd, controllercolorview, controllercolordelete, controllercolorupdate, controllercolorchangesatatus ,controllersingledata}

