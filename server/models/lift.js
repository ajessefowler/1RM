var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LiftSchema = new Schema(
	{
		name: { type: String, maxLength: 20, required: true },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		erm: { type: Number, min: 0, required: true },
		weight: { type: Number, min: 0, required: true },
		reps: { type: Number, min: 0, required: true },
		date: { type: Date, default: Date.now }
	}
);

module.exports = mongoose.model('Lift', LiftSchema);

