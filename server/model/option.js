const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema(
    {
        content: {
            type : String,
            required : true
        },
        optionNo: {
            type : Number,
            required : true
        }
    },
    { timestamps: true }
);


module.exports = optionSchema;