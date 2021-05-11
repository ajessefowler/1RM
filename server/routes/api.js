
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const User = require('../models/user');
const Lift = require('../models/lift');
const LiftInstance = require('../models/liftinstance');

/* Calculate and return E1RM. */
router.post('/1rm', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Request needs weight and reps
    res.status(200).json({ erm: calculateE1RM(req.body.weight, req.body.reps)});
});

/* Get lifts for user. */
router.post('/lifts', (req, res) => {
    // Request needs username
    // We need to find the user and ensure the lift is for the right user
    User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
                // Get all lifts for user
                Lift.find({user: user})
                    .then(lifts => {
                        // Return lifts even if there are none
                        res.status(200).json(lifts);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    })
            } else {
                // Need User to get lifts, return error
                res.status(404).json({error: 'no user found'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

/* Get all instances of a lift. */
router.post('/lifts/instances', (req, res) => {
    // Request needs name of lift and username
    User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
               Lift.findOne({name: req.body.name, user})
                .then(lift => {
                    LiftInstance.find({lift: lift})
                        .then(instances => {
                            // Return instances even if there are none
                            res.status(200).json(instances);
                        })
                        .catch(error => {
                            res.status(500).json(error);
                        });
                })
                .catch(error => {
                    res.status(500).json(error);
                });
            } else {
                // Need User to get lifts, return error
                res.status(404).json({error: 'no user found'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

/* Add a new instance of a lift. */
router.post('/lifts/instances/add', (req, res) => {
    // Request needs name of lift, username, weight, reps, and date
    const name = req.body.name;

    // We need to find the user and ensure the lift is for the right user
    User.findOne({username: req.body.username})
        .then(user => {
            if (user) {
                Lift.findOne({name: name, user: user})
                    .then(lift => {
                        if (lift) {
                            const erm = calculateE1RM(req.body.weight, req.body.reps);
                            const date = req.body.date ? req.body.date : Date.now();
                            const newLiftInstance = LiftInstance({lift: lift, erm: erm, weight: req.body.weight, reps: req.body.reps, date: date});
                        
                            // Save lift instance to database
                            newLiftInstance.save()
                                .then(liftInstance => {
                                    // Return instance, grab E1RM from here
                                    res.status(200).json(liftInstance);
                                })
                                .catch(error => {
                                    res.status(500).json(error);
                                });
                        } else {
                            // Need Lift to save instance, return error
                            res.status(404).json({error: 'no lift found'});
                        }
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            } else {
                // Need User to save lift, return error
                res.status(404).json({error: 'no user found'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

/* Add a new lift. */
router.post('/lifts/add', (req, res) => {
    // Request needs name of lift and username
    const name = req.body.name;
    const username = req.body.username;

    User.findOne({username: username})
        .then(user => {
            if (user) {
                const newLift = Lift({name: name, user: user});

                // Save lift to database
                newLift.save()
                    .then(lift => {
                        res.status(200).json(lift);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            } else {
                // Need User to save lift, return error
                res.status(404).json({error: 'no user found'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

function calculateE1RM(weight, reps) {
    // Use 3 different estimation techniques
    const epley = weight * (1 + (reps / 30));
    const brzycki = weight * (36 / (37 - reps));
    const mcglothin = (100 * weight) / (101.3 - (2.67123 * reps));

    // Average the three estimates
    return ((epley + brzycki + mcglothin) / 3);
}

module.exports = router;
