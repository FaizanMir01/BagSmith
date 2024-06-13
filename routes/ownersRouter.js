const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owners-model")



if(process.env.NODE_ENV=== "development"){
    router.post("/create",async(req,res)=>{
        let owners = await ownerModel.find();
        if(owners.length>0){
            return res.status(503).send("you dont have permisiion to create a new owner")
        }
        let {fullname, email, password}= req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.send(createdOwner);
        consolelog(createdOwner)
    })
    }
    


router.get("/admin",(req,res)=>{
    let success= req.flash("success");
    res.render("createproducts",{success});

})

    



module.exports = router;