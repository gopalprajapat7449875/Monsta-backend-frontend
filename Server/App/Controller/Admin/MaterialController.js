// const MaterialUseadd = require("../Model/MaterialModel")

const MaterialUseadd = require("../../Model/MaterialModel")

let controllerMaterialadd = async (req, res) => {


    let { _MetarialName } = req.body

    if (_MetarialName != 'Anil') {


        var check = await MaterialUseadd.findOne({
            _MetarialName: _MetarialName,
            _Metarial_Deleted_to: null
        })
    }

    if (check) {
        let obj = {
            _status: false,
            _Message: 'Material alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let Materialres = await MaterialUseadd.insertOne(req.body)



            let obj = {
                _status: true,
                _Message: 'Material add',
                Materialres
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
let controllerMaterialview = async (req, res) => {


    let nondeleted = {
        _Metarial_Deleted_to: null
    }
    let Materialres = await MaterialUseadd.find(nondeleted)
    let obj = {
        _status: true,
        _Message: 'Material view',
        Materialres
    }
    res.send(obj)
}
let controllerMaterialupdateView = async (req, res) => {

let{_id}=req.params

   
    let Materialdata = await MaterialUseadd.findById(_id)
    let obj = {
        _status: true,
        _Message: 'Material view',
        Materialdata
    }
    res.send(obj)
}
let controllerMaterialdelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    MaterialUseadd.updateMany(
        { _id: _id }
        , {
            $set: {
                _Metarial_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'Material delete',
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
let controllerMaterialchangesatatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    MaterialUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _MetarialStatus: {
                    $not: "$_MetarialStatus"
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
                _Message: 'Meterial Status Changed successfully ',
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
let controllerMaterialupdate = (req, res) => {

    let { _id } = req.params;


    MaterialUseadd.updateOne(
        { _id: _id }
        ,
        {
            $set: req.body
        }

    )
        .then((updateres) => {

            let obj = {
                _status: true,
                _Message: 'Material updated',
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
module.exports = {controllerMaterialupdateView, controllerMaterialadd, controllerMaterialview, controllerMaterialdelete, controllerMaterialupdate,controllerMaterialchangesatatus }

