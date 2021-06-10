const mongoose = require('mongoose');
const optionSchema = require('./option');

const questionSchema = new mongoose.Schema(
    {
        locationId: {
            type : String,
            required : true,
            index : true
        },
        question: {
            content : {
                type : String,
                required : true,
            },
            image : {
                type : String
            },
            type : {
                type : String,
                required : true,
            }
        },
        options: {
            type : [optionSchema],
            required : true
        },
        answer: {
            type: Number,
            required : true
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Question', questionSchema);