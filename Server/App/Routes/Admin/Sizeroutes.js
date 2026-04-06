let express =require('express')
const { controllerSizeview, controllerSizeadd, controllerSizedelete, controllerSizeupdate, controllersizechangesatatus } = require('../../Controller/Admin/SizeController')

let SizeRoutes =express.Router()


SizeRoutes.get('/view',controllerSizeview )
SizeRoutes.post('/create',controllerSizeadd )
SizeRoutes.post('/change-status',controllersizechangesatatus )
SizeRoutes.post('/delete', controllerSizedelete)
SizeRoutes.put('/update/:_id',controllerSizeupdate)

module.exports={SizeRoutes}