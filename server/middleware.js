const jwt = require('jsonwebtoken');
const tokenSecret = 'kl25aer67457hdfsh235';

exports.verify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(403).json({error: 'missing token'})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'cannot verify token'});
            else {
                req.user = value.data;
                next();
            }
        });
    }
}