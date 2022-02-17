const taskModel = require('../models/taskModel');

const getAll = async () => {
  const allTasks = await taskModel.getAll();

  return allTasks;
};

module.exports = {
  getAll,
};
