
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const User = require('../models/user');
const Lift = require('../models/lift');
const LiftInstance = require('../models/liftinstance');

/* Calculate and return E1RM. */
router.post('/1rm', (req, res) => {
    // Request needs weight and reps
    res.status(200).json({ erm: calculateE1RM(req.body.weight, req.body.reps) });
});

/* Get lifts for user. */
router.get('/:userId/lifts', middleware.verify, (req, res) => {
    // Request needs username
    User.findById(req.params.userId)
        .then(user => {
            if (user) {
                // Get all lifts for user
                Lift.find({ user: user })
                    .then(lifts => {
                        // Return lifts even if there are none
                        res.status(200).json(lifts);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    })
            } else {
                // Need User to get lifts, return error
                res.status(404).json({ error: 'no user found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/:liftId/instances', middleware.verify, (req, res) => {
    const liftId = req.params.liftId;

    Lift.findById(req.params.liftId)
        .then(lift => {
            LiftInstance.find({ lift: lift })
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
});

/* Add a new instance of a lift. */
router.post('/lifts/instances/add', middleware.verify, (req, res) => {
    // Request needs name of lift, username, weight, reps, and date
    const name = req.body.name;

    // TODO - instead of getting user and lift, send liftId and findById on lift

    // We need to find the user and ensure the lift is for the right user
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                Lift.findOne({ name: name, user: user })
                    .then(lift => {
                        if (lift) {
                            const erm = calculateE1RM(req.body.weight, req.body.reps);
                            const date = req.body.date ? req.body.date : Date.now();
                            const newLiftInstance = LiftInstance({ lift: lift, erm: erm, weight: req.body.weight, reps: req.body.reps, date: date });

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
                            res.status(404).json({ error: 'no lift found' });
                        }
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            } else {
                // Need User to save lift, return error
                res.status(404).json({ error: 'no user found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

/* Add a new lift. */
router.post('/lifts/add', middleware.verify, (req, res) => {
    // Request needs name of lift and username
    const name = req.body.name;
    const username = req.body.username;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                const newLift = Lift({ name: name, user: user });

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
                res.status(404).json({ error: 'no user found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// TODO - change to PUT
router.post('/lifts/modify', (req, res) => {
    // Request needs lift id and new name
    const liftId = req.body.id;
    const newName = req.body.newName;

    Lift.findByIdAndUpdate(liftId, { name: newName })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

/* Remove a lift */

// TODO - change to DELETE
router.post('/lifts/delete', (req, res) => {
    // Request needs name of lift and username
    const name = req.body.name;
    const username = req.body.username;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                /* Delete all instances before deleting lift itself */
                const deletedCount = deleteAllInstances(name, user);

                Lift.findOneAndDelete({ name: name, user: user })
                    .then(response => {
                        res.status(200).json(response);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            } else {
                res.status(404).json({ error: 'no user found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// TODO - change to DELETE
router.post('/lifts/instances/delete', (req, res) => {
    const instanceId = req.body.id;

    LiftInstance.findByIdAndDelete(instanceId)
        .then(response => {
            if (response) {
                console.log('deleted instance ' + instanceId);
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'no instance found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

// TODO - change to PUT
router.post('/lifts/instances/modify', (req, res) => {
    const instanceId = req.body.id;
    const oldDate = req.body.oldDate;
    const oldWeight = req.body.oldWeight;
    const oldReps = req.body.oldReps;
    const oldErm = req.body.oldErm;
    const newDate = req.body.date ? req.body.date : oldDate;
    const newWeight = req.body.weight ? req.body.weight : oldWeight;
    const newReps = req.body.reps ? req.body.reps : oldReps;
    const newErm = req.body.erm ? req.body.erm : oldErm;

    LiftInstance.findByIdAndUpdate(instanceId, { date: newDate, weight: newWeight, reps: newReps, erm: newErm })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// Delete all instances of a lift so the lift can be deleted
async function deleteAllInstances(liftName, user) {
    Lift.findOne({ name: liftName, user: user })
        .then(lift => {
            if (lift) {
                LiftInstance.deleteMany({ lift: lift })
                    .then(deleted => {
                        return deleted.deletedCount;
                    });
            }
        })
        .catch(error => {
            console.log('error');
        })
}

function calculateE1RM(weight, reps) {
    // With only one rep, we assume that is a max
    if (reps == 1) return weight;

    // Use 3 different estimation techniques
    const epley = weight * (1 + (reps / 30));
    const brzycki = weight * (36 / (37 - reps));
    const mcglothin = (100 * weight) / (101.3 - (2.67123 * reps));

    // Average the three estimates
    return ((epley + brzycki + mcglothin) / 3);
}

module.exports = router;
