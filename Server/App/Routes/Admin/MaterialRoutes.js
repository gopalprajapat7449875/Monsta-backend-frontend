let express =require('express')
const { controllerMaterialview, controllerMaterialadd, controllerMaterialdelete, controllerMaterialupdate, controllerMaterialchangesatatus, controllerMaterialupdateView } = require('../../Controller/Admin/MaterialController')

let MaterialRoutes =express.Router()


MaterialRoutes.get('/view',controllerMaterialview )
MaterialRoutes.post('/create',controllerMaterialadd )
MaterialRoutes.post('/delete/', controllerMaterialdelete)
MaterialRoutes.post('/change-status', controllerMaterialchangesatatus)
MaterialRoutes.get('/updateview/:_id',controllerMaterialupdateView )
MaterialRoutes.put('/update/:_id',controllerMaterialupdate)

module.exports={MaterialRoutes}