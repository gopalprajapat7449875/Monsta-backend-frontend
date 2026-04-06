const mongoose = require('mongoose');

let Faqmodel = mongoose.Schema(
    {
        _FaqQuestion: {
            type: String,
            required: [true, 'Please Fill Question'],
            minlength: [10, 'please fill minimum 10 car..'],
            maxlength: [3000, 'please fill maximum 3000 car..']
        },
        _FaqAnswer: {
            type: String,
            required: [true, 'Please Fill Question'],
            minlength: [10, 'please fill minimum 10 car..'],
            maxlength: [3000, 'please fill maximum 3000 car..']
        },
        _FaqOrder: {
            type: Number,
            required: true
        },
        _FaqStatus: {
            type: Boolean,
            default: true
        },
        _Faq_Creted_to: {
            type: Date,
            default: new Date()
        },
        _Faq_Updated_to: {
            type: Date,
            default: new Date()
        },
        _Faq_Deleted_to: {
            type: Date,
            default: null
        }



    }
)
let FaqUseadd = mongoose.model("Faq", Faqmodel)
module.exports = FaqUseadd