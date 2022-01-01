const express = require('express');
const router = express.Router();
const middleware = require('../middleware/verifyAuth.middleware');
const liftController = require('../controllers/lift.controller');

router.post('/1rm', liftController.getE1RM);
router.get('/:userId/lifts', middleware.verifyAuth, liftController.getLifts);
router.get('/:liftId/instances', middleware.verifyAuth, liftController.getLiftInstances);
router.post('/lifts/add', middleware.verifyAuth, liftController.addLift);
router.post('/lifts/instances/add', middleware.verifyAuth, liftController.addLiftInstance);
router.put('/lifts/modify', middleware.verifyAuth, liftController.modifyLift);
router.put('/lifts/instances/modify', middleware.verifyAuth, liftController.modifyLiftInstance);
router.delete('/lifts/delete', middleware.verifyAuth, liftController.deleteLift);
router.delete('/lifts/instances/:instanceId/delete', middleware.verifyAuth, liftController.deleteLiftInstance);

module.exports = router;
