var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dbSchema = new Schema({
    isTeacher: {
        type: Boolean,
    },

    teacherIs: {
        type: String,
        required: "String is Required"
        //dropdown
    },

    studentIs: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        trim: true,
        required: true
    },

    lastName: {
        type: String,
        trim: true,
        required: true
    },

    className: {
        type: String,
        required: true
        //dropdown
    },

    tuition: {
        type: Number,
        trim: true
    },

    tuitionOwed: {
        type: Number,
       //calculated
    },

    schedule: {
        type: Date,
    },
    date: {
        type: Date,
        default: Date.now
    },

    time: {
        type: Date,
    },

    duration: {
        type: Number,
    },

    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    password: {
        type: Schema.Types.Mixed,
        trim: true,
        required: true,
        validate: [
            function (input) {
                return input.length >= 6;
            },
            // Error Message
            "Password should be at least 6 characters in length."
        ]
    }
});

// This creates our model from the above schema, using mongoose's model method
var createSchema = mongoose.model("Example", dbSchema);

// Export the Example model
module.exports = createSchema;
