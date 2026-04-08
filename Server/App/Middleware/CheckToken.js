const jwt = require("jsonwebtoken");
let CheckToken = (req, res, next) => {


    try {
        let token = req.headers.authorization;

        
        let onlytoken = token.split(" ")[1]
    

        let deCode = jwt.verify(onlytoken, process.env.TOKENKEY)
     
        let { UserId } = deCode
                
 
        req.body._UserId = UserId
        next();
    } catch (error) {
        let obj = {
            _status: false,
            _message: "Invalid Token",
        };
        res.status(401).json(obj);

    }
};
module.exports = { CheckToken };