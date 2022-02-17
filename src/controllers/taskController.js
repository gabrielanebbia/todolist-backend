const { StatusCodes } = require('http-status-codes');
const taskService = require('../services/taskService');

const getAll = async (_req, res) => {
  const allTasks = await taskService.getAll();

  return res.status(StatusCodes.OK).json(allTasks);
};

module.exports = {
  getAll,
};
