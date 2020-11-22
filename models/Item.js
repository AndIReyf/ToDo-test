const {Schema, model} = require('mongoose')

const Item = new Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isDone: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
})

module.exports = model('Item', Item)
