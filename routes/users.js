const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//login
router.post('/login', async(req,res) => {
    const {username,password} = req.body
    
    const user = await User.findOne({username})
    
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
            role: user.role
        })
    }else{
        res.status(400).json({ message: 'invalid' }) 
    }
    
        // res.json({message: 'Login User'})
    })


//create staff
router.post('/create', async(req,res) => {
    const { username, password, role} = req.body

    const userExists = await User.findOne({username})

    if(userExists){
        res.status(400).json({ message: 'invalid' })   
    }else{

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        username,
        password: hashedPassword,
        role
    })

    if(user){
        res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid user data")
    }
}
})

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = router;