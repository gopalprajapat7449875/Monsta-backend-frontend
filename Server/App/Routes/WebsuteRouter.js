let express = require('express')
const { UserRoutes } = require('./Website/UserRoutes')
const { HomeRoute } = require('./Website/HomeRoutes')
const { CartRoutes } = require('./Website/CartRoutes')
const { OrderRoute } = require('./Website/OrderRoutes')
let WebsiteRoute = express.Router()


WebsiteRoute.use('/user',UserRoutes)
WebsiteRoute.use('/home',HomeRoute)
WebsiteRoute.use('/cart',CartRoutes)
WebsiteRoute.use('/order',OrderRoute)
module.exports={WebsiteRoute}