const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const BookingSchema = new Schema({
    bookingStartDate: {
        type: Date,
        required: true
    },
    bookingEndDate: {
        type: Date,
        required: true
    },
    invoice: {
        type: String,
        required: true
    },
    itemId: [{
        _id: {
            type: ObjectId,
            ref: 'Item',
            required: true
        },
        title: {
            type: Number,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }],
    memberId: [{
        type: ObjectId,
        ref: 'Member'
    }],
    bankId: {
        type: ObjectId,
        ref: 'Bank'
    },
    payments: {
        proofPayment: {
            type: String,
            required: true
        },
        bankFrom: {
            type: String,
            required: true
        },
        accountHolder: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
    }
})

module.exports = mongoose.model('Booking', BookingSchema)