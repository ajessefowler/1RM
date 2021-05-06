var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LiftSchema = new Schema(
	{
		name: { type: String, maxLength: 20, required: true },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	}
);

module.exports = mongoose.model('Lift', LiftSchema);

