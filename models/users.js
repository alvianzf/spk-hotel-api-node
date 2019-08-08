var mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
}, {timestamps: true})

mongoose.model('Users', usersSchema)