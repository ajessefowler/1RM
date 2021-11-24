const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware');
const tokenSecret = 'kl25aer67457hdfsh235';
const rounds = 10;

/* Log user in and return token. */
router.post('/login', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user) res.status(404).json({error: 'no user found'});
            else {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) res.status(500).json(error)
                    else if (match) res.status(200).json({user: user, token: generateToken(user)})
                    else res.status(403).json({error: 'passwords do not match'})
                });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

/* Register the user and return token. */
router.post('/register', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, rounds, (error, hash) => {
                    if (error) res.status(500).json(error);
                    else {
                        const newUser = User({username: req.body.username, password: hash});
                        newUser.save()
                            .then(user => {
                                res.status(200).json({user: user, token: generateToken(user)});
                            })
                            .catch(error => {
                                res.status(500).json(error);
                            });
                    }
                });
            } else {
                res.status(500).json({error: 'username already taken'});
            }
        });
});

router.post('/changePassword/:userId', (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) res.status(404).json({error: 'no user found'});
        });
});

router.post('/isLoggedIn', (req, res) => {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({error: 'missing token'})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'cannot verify token'});
            else res.status(200).json({isLoggedIn: true});
        });
    }
})

router.post('/verifyJwt', middleware.verify, (req, res) => {
    res.status(200).json(req.user);
})

function generateToken(user) {
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'});
}

module.exports = router;