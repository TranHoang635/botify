const mongoose = require("mongoose")

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    bcoin: { type: Number, default: 0 },
    cooldowns: {
        beg: { type: Date },
        daily: { type: Date }
    }
})

module.exports = { User: mongoose.model('User', User) }