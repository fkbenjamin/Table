'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var remciCtrlStub = {
  index: 'remciCtrl.index',
  show: 'remciCtrl.show',
  create: 'remciCtrl.create',
  upsert: 'remciCtrl.upsert',
  patch: 'remciCtrl.patch',
  destroy: 'remciCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var remciIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './remci.controller': remciCtrlStub
});

describe('Remci API Router:', function() {
  it('should return an express router instance', function() {
    expect(remciIndex).to.equal(routerStub);
  });

  describe('GET /api/remcis', function() {
    it('should route to remci.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'remciCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/remcis/:id', function() {
    it('should route to remci.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'remciCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/remcis', function() {
    it('should route to remci.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'remciCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/remcis/:id', function() {
    it('should route to remci.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'remciCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/remcis/:id', function() {
    it('should route to remci.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'remciCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/remcis/:id', function() {
    it('should route to remci.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'remciCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
