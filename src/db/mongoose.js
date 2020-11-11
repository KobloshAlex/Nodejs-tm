const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
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