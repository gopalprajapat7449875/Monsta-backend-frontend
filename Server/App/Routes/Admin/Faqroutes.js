let express =require('express')

const { controllerFaqadd, controllerFaqview, controllerFaqdelete, controllerFaqupdate, controllerFaqchangesatatus, controllerFaqupdateview } = require('../../Controller/Admin/FaqController')
let FaqRoutes =express.Router()


FaqRoutes.get('/view',controllerFaqview )
FaqRoutes.post('/create',controllerFaqadd )
FaqRoutes.post('/delete/', controllerFaqdelete)
FaqRoutes.post('/change-status', controllerFaqchangesatatus)
FaqRoutes.get('/updateview/:_id',controllerFaqupdateview )
FaqRoutes.put('/update/:_id',controllerFaqupdate)

module.exports={FaqRoutes}