var mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var dbSchema = new Schema({
    isTeacher: {
        type: Boolean,
        default: false,
        required: true
    },
    teacherIs: {
        type: String,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
        // required: true
    },
    lastName: {
        type: String,
        trim: true,
        // required: true
    },
    class: {
        className: {
            type: String
        },
        tuition: {
            type: Number
        },
        time: {
            type: String
        },
        date: {
            type: String
        }
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    tuitionOwed: {
        type: Number
    },
    emailid: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        // required: true
    },
    password: {
        type: Schema.Types.Mixed,
        trim: true,
        validate: [
            function (input) {
                return input.length >= 6;
            },
            // Error Message
            "Password should be at least 6 characters in length."
        ]
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else{
        res.redirect('/users/login')
    }
}

// This creates our model from the above schema, using mongoose's model method
var model = mongoose.model("Example", dbSchema);

// Export the Example model
module.exports = model;

