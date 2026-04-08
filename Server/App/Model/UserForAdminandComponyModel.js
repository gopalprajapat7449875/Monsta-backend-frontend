const mongoose = require('mongoose');

let UserForAdminAndCompanymodel = mongoose.Schema(
    {
        _UserName: {
            type: String,
            required: [true, "please File  _UserName"],
              match: /^[a-zA-Z ]{2,25}$/,
              validate: {
                validator: async function (v) {
                    const _UserName = await this.constructor.findOne({ _UserName: v, deleted_at : null });
                    return !_UserName;
                },
                message: props => `The specified Name is already in use.`
            }

        },

        _UserEmail: {
            type: String,
            required: [true, "please File  _UserEmail"],
               match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              validate: {
                validator: async function (v) {
                    const _UserEmail = await this.constructor.findOne({ _UserEmail: v, deleted_at : null});
                    return !_UserEmail;
                },
                message: props => `The specified email is already in use.`
            }

        },
        _UserPhoneNumber: {
            type: String,
            required: [true, "please File  _UserPhoneNumber"],
            

        },
          _CompanyName: {
            type: String,
          
             

        },
         _CompanyEmail: {
            type: String,
           

        },
         _UserState: {
            type: String,
            required: [true, "please File  _UserState"],
            

        },
         _UserCity: {
            type: String,
            required: [true, "please File  _UserCity"],
            

        },
         _UserPinCode: {
            type: String,
            required: [true, "please File  _UserPinCode"],
            

        },
         _UserCoupanCode: {
            type: String,
           

        },
         _UserCountry: {
            type: String,
            required: [true, "please File  _UserCountry"],
            default: 'India',
            

        },
        
        _UserGender: {
            type: String,
            enum: [1, 2], // Allowed values
            default: 1, // Optional default value

        },
        _UserPassword: {
            type: String,
            required: [true, "please File  _UserPassword"],

        },
        _UserAddress: {
            type: String,


        },


        _ProfilePic: String,



        _UserStatus: {
            type: Boolean,
            default: true
        },
        _User_Creted_to: {
            type: Date,
            default: new Date()
        },
        _User_Updated_to: {
            type: Date,
            default: new Date()
        },
        _User_Deleted_to: {
            type: Date,
            default: null
        }



    }
)
let UserAdminUseadd = mongoose.model("useradmin", UserForAdminAndCompanymodel)
module.exports = UserAdminUseadd