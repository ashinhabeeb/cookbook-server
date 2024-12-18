
//import bcrypt
const bcrypt = require('bcrypt')

//import jwt
const jwt = require('jsonwebtoken')

//register
const users = require("../model/userModel")

exports.registerController = async(req,res)=>{
    const {username,email,password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account already exist")
        }
        else{
            const encryptPassword = await bcrypt.hash(password,10)
            console.log(encryptPassword)

            const newUser = new users({
                username,
                email,
                password:encryptPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.loginController = async(req,res)=>{
    const {email,password} = req.body
    console.log(email,password)

    try {
        const existinguser = await users.findOne({email})
        console.log(existinguser)
        if (existinguser) {
            const match = await bcrypt.compare(password,existinguser.password)
            console.log(match)
            if(match==true){
                const token = jwt.sign({userId:existinguser._id},'secretkey')
                res.status(200).json({existinguser,token})
            }
            else{ 
                res.status(404).json('invalid password')
            }
        } else {
            res.status(406).json('invalid email id')
        }

    } catch (error) {
     res.status(401).json(error)   
    }
}

// edit user

exports.editUserController = async(req,res)=>{
    console.log("inside editUserController")

    const {profileImg} = req.body
    const userId = req.payload

    try {

        const existingUser = await users.findById({_id:userId})
        existingUser.profileImg = profileImg
        await existingUser.save()
        res.status(200).json(existingUser)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all users

exports.getAllUsersController = async(req,res)=>{
    console.log("inside getAllUsersController")

    try {
        const allUsers = await users.find({"role":"user"})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}