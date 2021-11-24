
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const User = require('../models/user');

router.put('/users/:userId/toggleUnits', (req, res) => {
    const userId = req.params.userId;

    User.findById(req.params.userId)
        .then(user => {
            if (!user) res.status(404).json({error: 'no user found'})
            else {
                // TODO - Convert all lift instances to new unit
                if (user.units === 'lbs') {
                    user.units = 'kg';
                }
                else {
                    user.units = 'lbs';
                }
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/users/:userId/delete', (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;