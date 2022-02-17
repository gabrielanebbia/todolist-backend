const { expect } = require('chai');
const sinon = require('sinon');

const taskModel = require('../../models/taskModel');
const taskService = require('../../services/taskService');

const tasksMocks = require('../mocks/tasksMocks');

describe('Get all tasks service', () => {
  describe('if has no tasks', () => {
    it('should return an array', async () => {
      const response = await taskService.getAll();

      expect(response).to.be.a('array');
    });

    it('should return an empty array', async () => {
      const response = await taskService.getAll();

      expect(response).to.be.empty;
    });
  });

  describe('if has tasks', () => {
    const tasks = [...tasksMocks.tasks];

    before(() => {
      sinon.stub(taskModel, 'getAll').resolves({ tasks });
    });

    after(() => {
      taskModel.getAll.restore();
    });

    it('should return an object', async () => {
      const response = await taskService.getAll();

      expect(response).to.be.a('object');
    });

    it('should return an object with tasks array', async () => {
      const response = await taskService.getAll();

      expect(response.tasks).to.be.a('array');

      expect(response.tasks).to.be.equal(tasks);
    });
  });
});
