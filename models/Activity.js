const mongoose = require('mongoose')

const { Schema } = mongoose

const activitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPopular: {
        type: Boolean,
        required: true
    },
})

module.exports = mongoose.model('Activity', activitySchema)