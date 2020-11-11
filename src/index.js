const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const User = require('./models/user')
const Task = require('./models/task')
require('./db/mongoose')

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
        console.log('user saved')
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.post('/tasks', (req, res) => {
    const task = Task(req.body)
    task.save().then(() => {
        res.send(task)
        console.log('new task added ' + task)
    }).catch(error => res.status(400).send(error))
})

app.listen(port, () => {
    console.log('start on port ' + port)
})