// creamos el modelo de usuario con mongoose
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: () => crypto.randomUUID()
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = crypto.randomUUID();
    }
    next();
});

const model_user = mongoose.model('User', userSchema);

module.exports = model_user;
