const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: [true, 'Task name is required'],
            maxlength: [30, 'First name should be less than 30 character'],
        },
        status: {
            type: String,
            required: [true, 'Task status is required'],
            enum: ['Completed', 'Incomplete'],
            default: 'Incomplete',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
