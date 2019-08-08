var mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    date: Date,
    selection: String
}, {timestamps: true})

mongoose.model('History', historySchema)