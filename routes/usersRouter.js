const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const userModel = require('../models/user-model');
const {generateToken}= require("../utils/generateToken")
const { registerUser, loginUser, logout }= require("../controllers/authController")

const jwt = require("jsonwebtoken")
require("dotenv").config()
router.get("/",(req,res)=>{
    res.send("hey");

})
router.post("/register",registerUser);

router.post("/login",loginUser)

router.get("/logout",logout)

module.exports = router;