const taskRoute = require('./taskRoute');

const route = (app) => {
    app.use('/tasks', taskRoute);
};

module.exports = route;
