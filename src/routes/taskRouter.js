const express = require('express')
const router = new express.Router()
const Task = require('../models/taskModel')
const authentication = require('../security/authentication')

router.get('/tasks', authentication, async (req, res) => {
    try {
        const task = await Task.find({owner: req.user._id})
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', authentication, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send('task was not found with id ' + _id)
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/tasks', authentication, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', authentication, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(value => allowedUpdates.includes(value))

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid argument'})
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send('task was not found with id ')
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', authentication, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send('task was not found with id ' + _id)
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router