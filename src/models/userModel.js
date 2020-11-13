const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('../models/taskModel')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw  new Error('email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('Password must have 6 or more symbols')
            } else if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot include string password')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('age must be greater than 0')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//generate jwt token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'salt');
    user.tokens = user.tokens.concat(({token}))
    await user.save()

    return token
}

//find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({email})
    console.log('word')
    if (!user) {
        throw new Error('fail login, check your email or password')
    }
    console.log('after !usr')

    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    console.log('is match')
    if (!isMatch) {
        throw new Error('fail login, check your email or password')
    }

    return user
}

//hash the password before save
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//cascade delete tasks
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})
//remove password and token from user response

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel