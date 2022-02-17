const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const allTasks = await db
    .collection('tasks')
    .find()
    .toArray();

  return allTasks;
};

module.exports = {
  getAll,
};
