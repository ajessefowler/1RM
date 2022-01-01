const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = 'kl25aer67457hdfsh235';
const rounds = 10;

const login = async (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user) res.status(404).json({error: 'no user found'});
            else {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) res.status(500).json(error);
                    else if (match) res.status(200).json({user: user, token: generateToken(user)});
                    else res.status(403).json({error: 'password is incorrect'});
                });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

const register = async (req, res) => {
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
}

const changePassword = async (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) res.status(404).json({error: 'no user found'});
            else {
                bcrypt.compare(req.body.oldPassword, user.password, (error, match) => {
                    if (error) res.status(500).json(error);
                    else if (match) {
                        bcrypt.hash(req.body.newPassword, rounds, (error, hash) => {
                            if (error) res.status(500).json(error);
                            else {
                                user.password = hash;
                                user.save()
                                    .then(updatedUser => {
                                        res.status(200).json({user: updatedUser});
                                    })
                                    .catch(error => {
                                        res.status(500).json(error);
                                    });
                            }
                        });
                    }
                    else res.status(403).json({error: 'Current password is incorrect.'});
                });
            }
        });
}

const isLoggedIn = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({error: 'missing token'})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'cannot verify token'});
            else res.status(200).json({isLoggedIn: true});
        });
    }
}

const generateToken = (user) => {
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '30d'});
}

module.exports = {
    login, register, changePassword, isLoggedIn, generateToken
}