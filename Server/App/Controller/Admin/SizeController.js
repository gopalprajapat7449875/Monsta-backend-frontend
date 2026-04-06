const SizeUseadd = require("../../Model/SizeModel")

let controllerSizeadd = async (req, res) => {

    let { _SizeName } = req.body

    var check = await ProductUseadd.findOne({
        _SizeName: _SizeName,
        _Size_Deleted_to: null
    })

    if (check) {
        let obj = {
            _status: false,
            _Message: 'Sizq alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let Sizeres = await SizeUseadd.insertOne(req.body)


            let obj = {
                _status: true,
                _Message: 'Size add',

                Sizeres,


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
let controllerSizeview = async (req, res) => {


    let nondeleted = {
        _Size_Deleted_to: null
    }
    let Sizeres = await SizeUseadd.find(nondeleted)
    let obj = {
        _status: true,
        _Message: 'Size view',
        Sizeres
    }
    res.send(obj)
}
let controllerSizedelete = async (req, res) => {

    let { _id } = req.body

    let Sizeres = await SizeUseadd.updateMany(
        { _id: _id }
        , {
            $set: {
                _Size_Deleted_to: new Date()
            }
        }
    )
    let obj = {
        _status: true,
        _Message: 'Size Deleted successfully ',
        Sizeres
    }
    res.send(obj)
}
let controllersizechangesatatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    SizeUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _SizeStatus: {
                    $not: "$_SizeStatus"
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
                _Message: 'Size Status Changed successfully ',
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
let controllerSizeupdate = async (req, res) => {

    let { _id } = req.params

    let upadetedata = await SizeUseadd.updateMany({
        _id: _id
    },
        {

            $set: req.body

        }
    )


    let obj = {
        _status: true,
        _Message: 'Size updeted',
        upadetedata
    }
    res.send(obj)
}
module.exports = { controllerSizeadd, controllerSizeview, controllerSizedelete, controllerSizeupdate,controllersizechangesatatus }

