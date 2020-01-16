const mongoose = require('mongoose');

const { Schema } = mongoose;
const roomSchema = new Schema({
    dtv_title: {
        type: String,
        required: true,
      },
    dtv_createdId: {
        type: String,
        required: true,
    },
    dtv_password: {
        type: String,
        required: false,
    },
    dtv_roomColor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Room', roomSchema);