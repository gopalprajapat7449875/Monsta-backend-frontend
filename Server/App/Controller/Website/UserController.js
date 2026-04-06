const UserUseadd = require("../../Model/UserModel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { transporter } = require("../../Config/helper");
const saltRounds = 10;
let UserCreate = async (req, res) => {






    let { _UserName, _UserPassword } = req.body





    try {


        let hashedPassword = _UserPassword;

        if (_UserPassword) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(_UserPassword, saltRounds);
        }


        let userres = await UserUseadd.insertOne({
            ...req.body,
            _UserPassword: hashedPassword
        })



        let obj = {
            _status: true,
            _Message: 'Sign Up Sucsess',
            userres
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

let UserLogin = async (req, res) => {

    let { _UserEmail, _UserPassword } = req.body

    try {

        let EmailCheak = await UserUseadd.findOne({ _UserEmail })







        if (EmailCheak) {

            const match = await bcrypt.compareSync(_UserPassword, EmailCheak._UserPassword);
            if (match) {


                let token = jwt.sign({ UserId: EmailCheak._id }, process.env.TOKENKEY);

                let obj = {
                    _status: true,
                    _Message: 'Login Sucess',
                    // _Login: EmailCheak,
                    token

                }
                res.send(obj)
            }
            else {
                let obj = {
                    _status: false,
                    _Message: 'Invalid Password',

                }
                res.send(obj)
            }

        }

        else {
            let obj = {
                _status: false,
                _Message: 'Email Is Invalid',

            }
            res.send(obj)

        }
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
let ChangePassaword = async (req, res) => {

    let { _NewPassword, _OldPassword } = req.body
    let token = req.headers.authorization;
    let onlytoken = token.split(" ")[1]
    let deCode = jwt.verify(onlytoken, process.env.TOKENKEY)
    let { UserId } = deCode
 


    let userData = await UserUseadd.findOne({ _id: UserId });

    let hashedPassword = userData._UserPassword
    let saltRounds = 10;
    if (bcrypt.compareSync(_OldPassword, hashedPassword)) {

        const hashedPassword = bcrypt.hashSync(_NewPassword, saltRounds);

        await UserUseadd.updateOne(
            {

                _id: UserId

            },
            {
                $set: {
                    _UserPassword: hashedPassword
                }
            }
        )
        let obj = {
            _status: true,
            _message: "Password Change Successfully...."
        }
        res.send(obj)

    }
    else {
        let obj = {
            _status: false,
            _message: " Invalid Old Password....",
        };
        res.send(obj);
    }





}

let ForgotPassaword = async (req, res) => {

    let { _UserEmail } = req.body
    let EmailCheak = await UserUseadd.findOne({ _UserEmail })
    if (EmailCheak) {

        let info = await transporter.sendMail({
            from: '"Furniture Mess" <gopalprajapat7449895@gmail.com>',
            to: _UserEmail,
            subject: "Furniture Messb|Forgot Password",
            text: "Reset Password link", // Plain-text version of the message
            html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>

<body style="margin:0; padding:0; background:#f5f5f5; font-family: Georgia, serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <!-- MAIN BOX -->
        <table width="600" cellpadding="0" cellspacing="0" 
          style="background:#ffffff; padding:40px; border-radius:10px; border:1px solid #eee;">

          <!-- HEADER -->
          <tr>
            <td align="center">
             
              <p style="color:#c58a00; margin-top:5px;">
               Password Reset
              </p>
              <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td>
              <h2 style="color:#111;">Reset Your Password</h2>
              <p style="color:#666; font-size:15px; line-height:1.6;">
                Forgot your password? No worries. Click the button below to set a new password for your account.
              </p>
            </td>
          </tr>

          <!-- BUTTON -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <a href="http://localhost:3000/reset-password/${EmailCheak._id}"
                 style="background:#c58a00;
                        color:#fff;
                        padding:14px 35px;
                        text-decoration:none;
                        border-radius:25px;
                        font-weight:bold;
                        display:inline-block;">
                RESET PASSWORD
              </a>
            </td>
          </tr>

          <!-- LINK -->
          <tr>
            <td>
              <p style="color:#777; font-size:13px;">
                If the button doesn’t work, copy and paste this link:
              </p>
              <p style="color:#c58a00; font-size:13px; word-break:break-all;">
              http://localhost:3000/reset-password/${EmailCheak._id}
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding-top:20px;">
              <hr style="border:none; border-top:1px solid #eee;">
              <p style="color:#999; font-size:12px; text-align:center;">
                If you didn’t request a password reset, please ignore this email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`, // HTML version of the message
        });

        let obj = {
            _status: true,
            _Message: 'Rest Password link Send Your Registerd Email.....',

        }
        res.send(obj)

    }
    else {
        let obj = {
            _status: false,
            _Message: 'Email Is Invalid',

        }
        res.send(obj)


    }

}
let ChangePassawordBeforeLogin = async (req, res) => {

    let { _NewPassword } = req.body
    let { id } = req.params
    




    let saltRounds = 10;



    let hashedPassword = bcrypt.hashSync(_NewPassword, saltRounds);

    let ResetPassword = await UserUseadd.updateOne(
        {

            _id: id

        },
        {
            $set: {
                _UserPassword: hashedPassword
            }
        }
    )
    let token = jwt.sign({ UserId: ResetPassword._id }, process.env.TOKENKEY);
    let obj = {
        _status: true,
        _message: "Password Reset Successfully....",
        ResetPassword,
        token

    }
    res.send(obj)






}
let Userdata = async (req, res) => {
    let token = req.headers.authorization;
    let onlytoken = token.split(" ")[1]
    let deCode = jwt.verify(onlytoken, process.env.TOKENKEY)
    let { UserId } = deCode



    let userData = await UserUseadd.findOne({ _id: UserId });

    let obj = {
        _status: true,
        _message: "User Found",
        userData,
         _path:process.env.USERMAINPATH,
    }
    res.send(obj)


}

let UserUpdate = async (req, res) => {

      let data = { ...req.body }
    let token = req.headers.authorization;
    let onlytoken = token.split(" ")[1]
    let deCode = jwt.verify(onlytoken, process.env.TOKENKEY)
    let { UserId } = deCode
     if (req.file) {
        if (req.file.filename) {
            data['_ProfilePic'] = req.file.filename
        }
    }
    let userData = await UserUseadd.updateOne(
            { _id: UserId }
            ,
            {
                $set: data
            }
        );
  let obj = {
        _status: true,
        _message: "User Data Updated",
       
      

      
    }
      console.log(process.env.USERMAINPATH)
    res.send(obj)
  



   

}

module.exports = { UserCreate, UserLogin, ChangePassaword, ForgotPassaword, ChangePassawordBeforeLogin, Userdata, UserUpdate }

