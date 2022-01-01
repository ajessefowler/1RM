const User = require('../models/user');
const Lift = require('../models/lift');
const LiftInstance = require('../models/liftInstance');

const unitConversionMultiplier = 2.2046226218;

const toggleUnits = async (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) res.status(404).json({error: 'no user found'})
            else {
                if (user.units === 'lbs') {
                    user.units = 'kg';
                }
                else {
                    user.units = 'lbs';
                }

                user.save()
                    .then(user => {
                        console.log('saved');
                    })
                    .catch(error => {
                        console.log(error);
                    });

                Lift.find({user: user})
                .then(lifts => {
                    lifts.forEach(lift => {
                        LiftInstance.find({lift: lift})
                            .then(liftInstances => {
                                convertAllInstances(liftInstances, user.units);
                                res.status(200);
                            })
                        })
                    })
                .catch(error => {
                    res.status(500).json(error);
                })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

const deleteUser = async (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

function convertAllInstances(lifts, newUnits) {
    newInstances = lifts.map(lift => {
        if (newUnits === 'lbs') {
            lift.erm = Math.round(lift.erm * unitConversionMultiplier);
            lift.weight = Math.round(lift.weight * unitConversionMultiplier);
        } else {
            lift.erm = Math.round(lift.erm / unitConversionMultiplier);
            lift.weight = Math.round(lift.weight / unitConversionMultiplier);
        }
        
        lift.save()
            .then(lift => {
                console.log('saved');
            })
            .catch(error => {
                console.log(error);
            });
    });
}

module.exports = {
    toggleUnits, deleteUser
}