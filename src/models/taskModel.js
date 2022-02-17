const mongoConnection = require('./connection');

const getAll = async () => {
  const db = await mongoConnection.connection();
  const allTasks = await db
    .collection('tasks')
    .find()
    .toArray();

  return allTasks;
};

const create = async (task) => {
  const db = await mongoConnection.connection();
  const { insertedId } = await db
    .collection('tasks')
    .insertOne(task);

  return insertedId;
};

module.exports = {
  getAll,
  create,
};
