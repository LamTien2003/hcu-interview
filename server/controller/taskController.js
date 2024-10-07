const catchAsync = require('../utils/catchAsync');
const Task = require('../model/taskModel');
const APIFeatures = require('../utils/apiFeatures');
const excelJS = require('exceljs');

const { sendResponseToClient } = require('../utils/utils');

exports.getAllTask = catchAsync(async (req, res) => {
    const taskQuery = new APIFeatures(Task.find(), req.query).search(['taskName'], 'searchText').filter().paginate();
    const tasks = await taskQuery.query;

    const totalItems = await new APIFeatures(Task.find(), req.query)
        .search(['taskName'], 'searchText')
        .filter()
        .query.count('totalItems');

    return sendResponseToClient(res, 200, {
        data: tasks,
        totalItems,
    });
});

exports.addTask = catchAsync(async (req, res) => {
    const payload = {
        taskName: req.body.taskName,
        status: req.body.status,
    };

    const newTask = await Task.create(payload);
    return sendResponseToClient(res, 200, {
        data: newTask,
    });
});
exports.editTask = catchAsync(async (req, res) => {
    const payload = {
        taskName: req.body.taskName,
        status: req.body.status,
    };

    const newTask = await Task.findByIdAndUpdate(req.params.taskId, payload);
    return sendResponseToClient(res, 200, {
        data: newTask,
    });
});
exports.bulkEditTasks = catchAsync(async (req, res) => {
    const payload = {
        listTask: req.body.listTask,
        status: req.body.status,
    };

    const newTasks = await Task.updateMany(
        { _id: { $in: payload.listTask } },
        { $set: { status: payload.status } },
        { multi: true, upsert: true, new: true },
    );
    return sendResponseToClient(res, 200, {
        data: newTasks,
    });
});

exports.exportExcel = catchAsync(async (req, res) => {
    const taskQuery = new APIFeatures(Task.find(), req.query).search(['taskName'], 'searchText').filter().paginate();
    const tasks = await taskQuery.query;

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Tasks');

    // Define columns in the worksheet
    worksheet.columns = [
        { header: 'Task Name', key: 'taskName', width: 20 },
        { header: 'Status', key: 'status', width: 20 },
    ];

    tasks.forEach((task) => {
        const data = {
            taskName: task.taskName,
            status: task.status,
        };
        worksheet.addRow(data);
    });
    // Set up the response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'users.xlsx');
    await workbook.xlsx.write(res);
});
