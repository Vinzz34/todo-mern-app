const mongoose = require('mongoose')
const bcyrpt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email,password){

    if(!email || !password){
        throw new Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Password not strong enough")
    }

    const exists = await this.findOne({email})

    if(exists){
        throw new Error("Email already in use")
    }

    const salt = await bcyrpt.genSalt(10)
    const hash = await bcyrpt.hash(password,salt)

    const user = await this.create({email,password: hash})

    return user
}

// static login method
userSchema.statics.login = async function(email,password){

    if(!email || !password){
        throw new Error("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user){
        throw new Error("Incorrect email")
    } 

    const match = await bcyrpt.compare(password,user.password)

    if(!match){
        throw new Error("Incorrect password")
    }

    return user
}


const User = mongoose.model('User',userSchema)

module.exports = User