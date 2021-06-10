const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema(
    {
        location: {
            type : String,
            required : true,
            unique : true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);