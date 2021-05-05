var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
	{
        username: { type: String, maxLength: 20, required: true },
        password: { type: String, required: true }
	}
);

module.exports = mongoose.model('User', UserSchema);