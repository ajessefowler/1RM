var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LiftInstanceSchema = new Schema(
	{
        lift: { type: Schema.Types.ObjectId, ref: 'Lift', required: true },
        erm: { type: Number, min: 0, required: true },
        weight: { type: Number, min: 0, required: true},
        reps: { type: Number, min: 0, required: true},
        date: { type: Date, default: Date.now }
    }
);
    
module.exports = mongoose.model('LiftInstance', LiftInstanceSchema);