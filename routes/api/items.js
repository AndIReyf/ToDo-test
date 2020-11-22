const router = require('express').Router()
const Item = require('../../models/Item')

router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({date: -1})

        if (!items) throw Error('No items')

        res.status(200).json(items)

    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})

router.post('/', async (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        order: req.body.order
    })

    try {
        const item = await newItem.save()

        if (!item) throw Error('Something went wrong saving the item')

        res.status(200).json(item)

    } catch (e) {
        res.status(400).json({ msg: e.message })
    }
})

router.put('/', async (req, res) => {
    try {
        const item = await Item.findById(req.body.id)

        if (!item) throw Error('No item found')

        item.title = req.body.title
        item.save()

        res.status(201).json(item)

    } catch (e) {
        res.status(400).json({ msg: e.message, success: false })
    }
})

router.put('/status', async (req, res) => {
    try {
        const item = await Item.findById(req.body.id)

        if (!item) throw Error('No item found')

        item.isDone = req.body.status
        item.save()

        res.status(201).json(item)

    } catch (e) {
        res.status(400).json({ msg: e.message, success: false })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)

        if (!item) throw Error('No item found')

        const removed = await item.remove()

        if (!removed) throw Error('Something went wrong while trying to delete the item')

        res.status(200).json({success: true})

    } catch (e) {
        res.status(400).json({ msg: e.message, success: false })
    }
})

module.exports = router
