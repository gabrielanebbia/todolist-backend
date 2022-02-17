const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAll);

module.exports = router;
