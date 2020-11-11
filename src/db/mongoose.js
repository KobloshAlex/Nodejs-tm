const validator = require('validator')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
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
            if(value.length < 6) {
                throw new Error('Password must have 6 or more symbols')
            } else if (value.includes('password')) {
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
    }
})
//
// const userOne = new User({
//     name: 'Alex12',
//     age: 12,
//     email: '123@1.com',
//     password: 'qwerty'
// })
// userOne.save().then(() => {
//     console.log(userOne)
// }).catch((error) =>{
//     console.log(error)
// })

//Tasks model

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})
//
// const newTask = new Task({
//     description: 'description 12214',
//     completed: false
// })
// newTask.save().then(()=>{
//     console.log(newTask)
// }).catch((error) => {
//     console.log(error)
// })