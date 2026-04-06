const nodemailer = require("nodemailer");

var slugify = require("slugify");
const UserAdminUseadd = require("../Model/UserForAdminandComponyModel");
let createSlug = (title) => {
  return slugify(title, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "gopalprajapat7449895@gmail.com",
    pass: "lglf mnwq fzpx nvsc",
  },
});

let AdminCreate=async ()=>{

  let admindata= UserAdminUseadd.find()
  if(admindata.length===0){

UserAdminUseadd.insertOne({
  _UserEmail:"gopalprajapat7449875@gmail.com",
  _UserPassword:"prajapat7449875"
})
  }

}


module.exports={createSlug,transporter,AdminCreate}