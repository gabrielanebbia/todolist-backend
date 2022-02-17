const { expect } = require('chai');
const sinon = require('sinon');

const taskService = require('../../services/taskService');
const taskController = require('../../controllers/taskController');

const tasksMocks = require('../mocks/tasksMocks');

describe('Get all tasks controller', () => {
  describe('if has no tasks', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(taskService, 'getAll').resolves({ tasks: [] });
    });

    after(() => {
      taskService.getAll.restore();
    });

    it('should return a status 200 - OK', async () => {
      await taskController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('should return a object json', async () => {
      await taskController.getAll(request, response);

      expect(response.json).to.be.equal('object');
    });

    it('should return a json with tasks as empty array', async () => {
      await taskController.getAll(request, response);

      expect(response.json.calledWith({ tasks: [] })).to.be.equal(true);
    });
  });

  describe('if has tasks', () => {
    const tasks = [...tasksMocks.tasks];

    const request = {};
    const response = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(taskService, 'getAll').resolves({ tasks });
    });

    after(() => {
      taskService.getAll.restore();
    });

    it('should return a status 200 - OK', async () => {
      await taskController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('should return a object json', async () => {
      await taskController.getAll(request, response);

      expect(response.json).to.be.equal('object');
    });

    it('should return a json with tasks as empty array', async () => {
      await taskController.getAll(request, response);

      expect(response.json.calledWith({ tasks })).to.be.equal(true);
    });
  });
});
