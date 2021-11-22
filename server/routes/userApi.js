
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const User = require('../models/user');

// TODO - implement this endpoint, which updates units and converts the
//        weights and erms of all of the user's lift instances
router.put('/users/:userId/toggleUnits', (req, res) => {
    const userId = req.params.userId;

    User.findOne({username: req.params.userId})
        .then(user => {
            if (!user) res.status(404).json({error: 'no user found'})
            else {
                // Toggle units
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/users/:userId/delete', (req, res) => {
    const userId = req.params.userId;

    User.findOne({username: req.params.userId})
        .then(user => {
            if (!user) res.status(404).json({error: 'no user found'})
            else {
                // Delete account
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});