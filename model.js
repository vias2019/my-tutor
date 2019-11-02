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
       //required: true
        //dropdown
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

    class:

        [
            {
                className: {
                    type: String
                },

                time: {
                    type: Date
                }
            }
        ],

    isRegistered: {
        type: Boolean,
        default: false
    },

    tuition: {
        type: Number,
        trim: true
    },

    tuitionOwed: {
        type: Number,
        //calculated
    },

    // schedule: {
    //     type: Date,
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // },

    // time: {
    //     type: Number
    // },


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

// Define schema methods
dbSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
dbSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

// This creates our model from the above schema, using mongoose's model method
var model = mongoose.model("Example", dbSchema);

// Export the Example model
module.exports = model;

