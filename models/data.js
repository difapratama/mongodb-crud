const mongoose = require('mongoose');

let dataSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    string: {
        type: String
    },
    integer: {
        type: Number
    },
    float: {
        type: Number
    },
    date: {
        type: String
    },
    boolean: {
        type: Boolean
    }
});

module.exports = mongoose.model('user', dataSchema);
