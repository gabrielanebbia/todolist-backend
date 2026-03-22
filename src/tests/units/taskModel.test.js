const { expect } = require('chai');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const { connection } = require('../mocks/mongoConnectionMock');

const taskModel = require('../../models/taskModel');

const tasksMocks = require('../mocks/tasksMocks');

describe('Task model', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('modelTests').collection('tasks').drop();
    MongoClient.connect.restore();
  });

  describe('Get all tasks model', () => {
    describe('if has no tasks', () => {
      it('should return an array', async () => {
        const response = await taskModel.getAll();

        expect(response).to.be.a('array');
      });

      it('should return an empty array', async () => {
        const response = await taskModel.getAll();

        expect(response).to.be.empty;
      });
    });

    describe('if has tasks', () => {
      const tasks = [...tasksMocks.tasks];

      before(async () => {
        tasks.forEach((task) => {
          connectionMock.db('modelTests').collection('tasks').insertOne(task);
        });
      });

      after(async () => {
        await connectionMock.db('modelTests').collection('tasks').deleteMany({});
      });

      it('should return an array', async () => {
        const response = await taskModel.getAll();

        expect(response).to.be.a('array');
      });

      it('should return an array with tasks', async () => {
        const response = await taskModel.getAll();

        response.forEach((task, index) => {
          expect(task).to.be.equal(tasks[index]);
        });

        expect(response).to.have.length(tasks.length);

        expect(response).to.include.all.keys('_id', 'task', 'status');
      });
    });
  });

  describe('Create task model', () => {
    describe('if a task is created', () => {
      const task = tasksMocks.tasks[0];

      after(async () => {
        await connectionMock.db('modelTests').collection('tasks').deleteMany({});
      });

      it('should return an object', async () => {
        const response = await taskModel.create(task);

        expect(response).to.be.a('object');
      });

      it('should have a task created', async () => {
        const taskCreated = await connectionMock
          .db('modelTests')
          .collection('tasks')
          .findOne({ task });
        expect(taskCreated).to.be.not.null;
      });
    });
  });
});
