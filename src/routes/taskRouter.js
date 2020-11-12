const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.post('/tasks', async (req, res) => {
    const task = Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(value => allowedUpdates.includes(value))

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid argument'})
    }

    const _id = req.params.id
    try {
        const task = await Task.findByIdAndUpdate(_id, res.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send('task was not found with id ' + _id)
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send('task was not found with id ' + _id)
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router