const model = require('../../model');
const LocalStrategy = require('passport-local').Strategy


const strategy = new LocalStrategy(
    
	{
		usernameField: 'emailid' // not necessary, usernameField is DEFAULT
	},
	function(emailid, password, done) {
		model.findOne({ emailid: emailid }, (err, user) => {
			if (err) {
				return (err)
			}
			if (!user) {
				return (null, false, { message: 'Incorrect email address' })
			}
			if (!user.checkPassword(password)) {
                console.log('incorrect pw');
				return (null, false, { message: 'Incorrect password' })
			}else{
                return done(null, user)
                }
		})
	}
)

module.exports = strategy
