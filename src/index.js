const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const User = require('./models/user')
const Task = require('./models/task')
require('./db/mongoose')

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//find all
app.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//findById
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send('user was not found with id ' + _id)
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//TASKS
//findAll tasks
app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send('task was not found with id ' + _id)
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//create task
app.post('/tasks', async (req, res) => {
    const task = Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log('start on port ' + port)
})