let mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: [true, 'We need to know your name']
},
	name: String,
	age: Number,
	email:{
		type: String,
		required: [true, 'You must enter an email']
	},
	email_verified:{
		type: Boolean,
		default: false
	},
	password: String

	
});
const userCol=mongoose.model('User', userSchema)

module.exports = userCol;