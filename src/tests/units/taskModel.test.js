const { expect } = require('chai');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const { connection } = require('../mocks/mongoConnectionMock');

// const mongoConnection = require('../../models/connection');
const taskModel = require('../../models/taskModel');

const tasksMocks = require('../mocks/tasksMocks');

describe('1 - Get all tasks', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await connection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('modelTests').collection('tasks').drop();
    MongoClient.connect.restore();
  });

  describe('if has no tasks', () => {
    it('should return an array', async () => {
      const response = await taskModel.getAll();

      expect(response).to.be.a('array');
    });

    it('should return an empty array', async () => {
      const response = await taskModel.getAll();

      expect(response).to.be([]);
    });
  });

  describe('if has tasks', () => {
    it('should return an array', async () => {
      const response = await taskModel.getAll();

      expect(response).to.be.a('array');
    });

    it('should return an array with tasks', async () => {
      const response = await taskModel.getAll();

      expect(response).to.have.length(tasksMocks.length);
    });
  });
});
