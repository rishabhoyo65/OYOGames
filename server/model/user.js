const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            index : true
        },
        password: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            trim: true,
        },
        lastQuestion : {
            type : String
        },
        score : {
            type : Number,
            default : 0
        },
        spinLeft : {
            type : Number,
            default : 25
        }
    },
    { timestamps: true }
);

userSchema.methods = {
    authenticate: function(plainText) {
        return plainText === this.password;
    },

};

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', userSchema);