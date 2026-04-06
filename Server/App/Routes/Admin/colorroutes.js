let express =require('express')
const { controllercolorview, controllercoloradd, controllercolordelete, controllercolorupdate, controllercolorchangesatatus, controllersingledata } = require('../../Controller/Admin/ColorController')

let colorRoutes =express.Router()


colorRoutes.get('/view',controllercolorview )
colorRoutes.post('/create',controllercoloradd )
colorRoutes.post('/delete/', controllercolordelete)
colorRoutes.put('/update/:_id',controllercolorupdate)
colorRoutes.get('/updatedata/:_id',controllersingledata )
colorRoutes.post('/change-status',controllercolorchangesatatus)
module.exports={colorRoutes}