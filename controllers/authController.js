const bcrypt = require("bcrypt")
const userModel = require('../models/user-model');
const {generateToken}= require("../utils/generateToken")

module.exports.registerUser =  async(req,res)=>{
    try{
        let{email,password , fullname}= req.body;


        let user = await userModel.findOne({email:email})
        if(user) return res.status(401).send("you already have account")




        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err) return res.send(err.message);
                else {
                    
    let user = await userModel.create({
        email,
        password:hash,
        fullname,
    });
    let token = generateToken(user);
    res.cookie("token", token)
    res.send("user created suesfully")

                }
            })
            
        })


    }
    catch(err){
        console.log(err.message)

    }

    
}

module.exports.loginUser = async function(req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) return res.send("email and password incorrect");

    bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            return res.redirect("/shop"); // Redirect to the /shop route
        }
    });
};

module.exports.logout = (req,res)=>{
    res.cookie("token","");
    res.redirect("/")
}