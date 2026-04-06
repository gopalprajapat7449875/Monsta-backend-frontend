// const FaqUseadd = require("../Model/FaqModel")

const FaqUseadd = require("../../Model/FaqModel")

let controllerFaqadd = async (req, res) => {


    let { _FaqQuestion } = req.body
   
if(_FaqQuestion!='Anil'){


    var check = await FaqUseadd.findOne({
    _FaqQuestion: _FaqQuestion,
     _Faq_Deleted_to: null
})
}

    if (check) {
 let obj = {
                _status: false,
                _Message: 'Faq alredy exist',
                
            }
            res.send(obj)


    } else {
        try {


            let Faqres = await FaqUseadd.insertOne(req.body)



            let obj = {
                _status: true,
                _Message: 'Faq added successfully',
                Faqres
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
let controllerFaqview = async (req, res) => {


    let nondeleted = {
        _Faq_Deleted_to: null
    }
    let Faqres = await FaqUseadd.find(nondeleted)
    let obj = {
        _status: true,
        _Message: 'Faq view',
        Faqres
    }
    res.send(obj)
}
let controllerFaqupdateview = async (req, res) => {

let {_id} =req.params

let updatedata=await FaqUseadd.findById(_id)

    
    let obj = {
        _status: true,
        _Message: 'Faq view',
        updatedata
    }
    res.send(obj)
}
let controllerFaqdelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    FaqUseadd.updateMany(
        { _id:_id }
        , {
            $set: {
                _Faq_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'Faq deleted successfully',
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
let controllerFaqchangesatatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    FaqUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _FaqStatus: {
                    $not: "$_FaqStatus"
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
                _Message: 'Faq Status Changed successfully ',
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
let controllerFaqupdate = (req, res) => {

    let { _id } = req.params;


    FaqUseadd.updateOne(
        {_id:_id}
        ,
        {
            $set: req.body
        }

    )
        .then((updateres) => {

            let obj = {
                _status: true,
                _Message: 'Faq updated',
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
module.exports = {controllerFaqupdateview, controllerFaqadd, controllerFaqview, controllerFaqdelete, controllerFaqupdate,controllerFaqchangesatatus }

