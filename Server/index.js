
const mongoose = require('mongoose');
let express = require('express')

require('dotenv').config()
let cors = require('cors')
const { AdminRoute } = require('./App/Routes/AdminRouter');
const { WebsiteRoute } = require('./App/Routes/WebsuteRouter');
const { AdminCreate } = require('./App/Config/helper');
let App = express()

App.use(cors())
App.use(express.json())

App.use('/admin', AdminRoute)
App.use('/website', WebsiteRoute)

App.use('/upload-files/category', express.static('upload-files/category'))
App.use('/upload-files/subcategory', express.static('upload-files/subcategory'))
App.use('/upload-files/slider', express.static('upload-files/slider'))
App.use('/upload-files/subsubcategory', express.static('upload-files/subsubcategory'))
App.use('/upload-files/userimages', express.static('upload-files/userimages'))
App.use('/upload-files/product', express.static('upload-files/product'))
App.use('/upload-files/cartimges', express.static('upload-files/cartimages'))
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBCONACTION}`)

    .then((res) => {

        App.listen(process.env.PORT || 8000, async () => {
            console.log('server start', process.env.PORT)

            await AdminCreate()
        })
    })


