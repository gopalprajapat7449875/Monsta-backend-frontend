

const CountryUseadd = require("../../Model/CountryModel")

let controllerCountryadd = async (req, res) => {


    let { _CountryName } = req.body
   
if(_CountryName!='Anil'){


    var check = await CountryUseadd.findOne({
    _CountryName: _CountryName,
    _Country_Deleted_to: null
})
}

    if (check) {
 let obj = {
                _status: false,
                _Message: 'Country Name alredy exist',
                
            }
            res.send(obj)


    } else {
        try {


            let Countryres = await CountryUseadd.insertOne(req.body)



            let obj = {
                _status: true,
                _Message: 'Country Nmae added successfully',
                Countryres
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
let controllerCountryview = async (req, res) => {


    let nondeleted = {
        _Country_Deleted_to: null
    }
    let Countryres = await CountryUseadd.find(nondeleted)
    let obj = {
        _status: true,
        _Message: 'Country view',
        Countryres
    }
    res.send(obj)
}
let controllerCountrydelete = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    CountryUseadd.updateMany(
        { _id:_id }
        , {
            $set: {
                _Country_Deleted_to: new Date()
            }
        }
    )
        .then((ress) => {
            let obj = {
                _status: true,
                _Message: 'Country delete',
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
let controllerCountrychangesatatus = async (req, res) => {

    let { _id } = req.body
    console.log(_id)
    CountryUseadd.updateMany(
        { _id: _id }
        , [{
            $set: {
                _CountryStatus: {
                    $not: "$_CountryStatus"
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
                _Message: 'Country Status Changed successfully ',
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
let controllerCountryupdate = (req, res) => {

    let { _id } = req.params;


    CountryUseadd.updateOne(
        { _id: _id }
        ,
        {
            $set: req.body
        }

    )
        .then((updateres) => {

            let obj = {
                _status: true,
                _Message: 'Country updated',
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
module.exports = { controllerCountryadd, controllerCountryview, controllerCountrydelete, controllerCountryupdate ,controllerCountrychangesatatus}

