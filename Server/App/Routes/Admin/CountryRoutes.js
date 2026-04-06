let express =require('express')
const { controllerCountryview, controllerCountryadd, controllerCountrydelete, controllerCountryupdate, controllerCountrychangesatatus } = require('../../Controller/Admin/CountryController')

let CountryRoutes =express.Router()


CountryRoutes.get('/view',controllerCountryview )
CountryRoutes.post('/create',controllerCountryadd )
CountryRoutes.post('/delete/', controllerCountrydelete)
CountryRoutes.post('/change-status', controllerCountrychangesatatus)
CountryRoutes.put('/update/:_id',controllerCountryupdate)

module.exports={CountryRoutes}