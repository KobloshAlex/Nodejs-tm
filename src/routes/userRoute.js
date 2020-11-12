const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//findById
router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(value => allowedUpdates.includes(value))

    if (!isValidOperation) {
        return res.status(400).send({error: 'invalid argument'})
    }

    const _id = req.params.id
    try {
        const user = User.findByIdAndUpdate(_id, res.body, {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send('user was not found with id ' + _id)
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send('user was not found with id ' + _id)
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router