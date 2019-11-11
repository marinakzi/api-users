const mongoose = require("../config/database");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
 	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true 
	},
 	password: {
		type: String,
		required: true,
		select: false
	}, 
	createDt: {
		type: Date,
		default: Date.now
	},
	admin: {
		type: Number,
		default: 0
	}
});

UserSchema.pre('save', async function(next){
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});
 
const Users = mongoose.model("Users", UserSchema);

module.exports = Users;