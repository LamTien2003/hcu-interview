const express = require('express');
const taskController = require('../controller/taskController');

const router = express.Router();

router.get('/downloadExcel', taskController.exportExcel);
router.patch('/bulkEdit', taskController.bulkEditTasks);
router.patch('/:taskId', taskController.editTask);
router.post('/', taskController.addTask);
router.get('/', taskController.getAllTask);

module.exports = router;
