'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newRemci;

describe('Remci API:', function() {
  describe('GET /api/remcis', function() {
    var remcis;

    beforeEach(function(done) {
      request(app)
        .get('/api/remcis')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          remcis = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(remcis).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/remcis', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/remcis')
        .send({
          name: 'New Remci',
          info: 'This is the brand new remci!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRemci = res.body;
          done();
        });
    });

    it('should respond with the newly created remci', function() {
      expect(newRemci.name).to.equal('New Remci');
      expect(newRemci.info).to.equal('This is the brand new remci!!!');
    });
  });

  describe('GET /api/remcis/:id', function() {
    var remci;

    beforeEach(function(done) {
      request(app)
        .get(`/api/remcis/${newRemci._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          remci = res.body;
          done();
        });
    });

    afterEach(function() {
      remci = {};
    });

    it('should respond with the requested remci', function() {
      expect(remci.name).to.equal('New Remci');
      expect(remci.info).to.equal('This is the brand new remci!!!');
    });
  });

  describe('PUT /api/remcis/:id', function() {
    var updatedRemci;

    beforeEach(function(done) {
      request(app)
        .put(`/api/remcis/${newRemci._id}`)
        .send({
          name: 'Updated Remci',
          info: 'This is the updated remci!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRemci = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRemci = {};
    });

    it('should respond with the updated remci', function() {
      expect(updatedRemci.name).to.equal('Updated Remci');
      expect(updatedRemci.info).to.equal('This is the updated remci!!!');
    });

    it('should respond with the updated remci on a subsequent GET', function(done) {
      request(app)
        .get(`/api/remcis/${newRemci._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let remci = res.body;

          expect(remci.name).to.equal('Updated Remci');
          expect(remci.info).to.equal('This is the updated remci!!!');

          done();
        });
    });
  });

  describe('PATCH /api/remcis/:id', function() {
    var patchedRemci;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/remcis/${newRemci._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Remci' },
          { op: 'replace', path: '/info', value: 'This is the patched remci!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRemci = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRemci = {};
    });

    it('should respond with the patched remci', function() {
      expect(patchedRemci.name).to.equal('Patched Remci');
      expect(patchedRemci.info).to.equal('This is the patched remci!!!');
    });
  });

  describe('DELETE /api/remcis/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/remcis/${newRemci._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when remci does not exist', function(done) {
      request(app)
        .delete(`/api/remcis/${newRemci._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
