const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyAuth.middleware');
const userController = require('../controllers/user.controller');

router.put('/:userId/toggleUnits', middleware.verifyAuth, userController.toggleUnits);
router.delete('/:userId/delete', middleware.verifyAuth, userController.deleteUser);

module.exports = router;