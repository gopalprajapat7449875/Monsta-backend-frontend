
const SliderUseadd = require("../../Model/SliderModel")



let SliderControlleradd = async (req, res) => {



    let data = { ...req.body }


    let { _SliderTitle } = req.body

    if (_SliderTitle != 'Anil') {


        var check = await SliderUseadd.findOne({
            _SliderTitle: _SliderTitle,
            _Slider_Deleted_to: null
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
            _Message: 'Slider alredy exist',

        }
        res.send(obj)


    } else {
        try {


            let Sliderres = await SliderUseadd.insertOne(data)



            let obj = {
                _status: true,
                _Message: 'Slider add',

                Sliderres,


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

let SliderControllerview = async (req, res) => {


    let nondeleted = {
        _Slider_Deleted_to: null
    }
    let Sliderres = await SliderUseadd.find(nondeleted)
    let obj = {
        _status: true,
        _Message: 'Slider view',
        _path: process.env.SLIDERMAINPATH,

        Sliderres
    }
    res.send(obj)
}
let SliderControllerdelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    SliderUseadd.updateMany(
        { _id: _id }
        , {
            $set: {
                _Slider_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'Slider delete',
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
let SliderControllerchangestatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    SliderUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _SliderStatus: {
                    $not: "$_SliderStatus"
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
                _Message: 'Slider Status Changed successfully ',
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

let Slidercontrollersingledata = async (req, res) => {
    let { _id } = req.params;

    let data = await SliderUseadd.findById(_id)

    res.status(200).json({
        _status: true,
        _Message: 'Slider Found',
         _path: process.env.SLIDERMAINPATH,
        data
    })
}
let SliderControllerupdate = (req, res) => {
let data = { ...req.body }
    let { _id } = req.params;

    console.log(_id)
      if (req.file) {
        if (req.file.filename) {
            data['_image'] = req.file.filename
        }
    }
    SliderUseadd.updateOne(
        { _id: _id }
        ,
        {
            $set: data
        }

    )
        .then((updateres) => {

            let obj = {
                _status: true,
                _Message: 'Slider updated',
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

module.exports = { SliderControlleradd, SliderControllerview, SliderControllerdelete, SliderControllerchangestatus, Slidercontrollersingledata, SliderControllerupdate }