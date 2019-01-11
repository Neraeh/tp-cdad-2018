var supertest = require('supertest');

describe('CowsayController.create', () => {

  describe('#create()', () => {
    it('should redirect to /say', (done) => {
      supertest(sails.hooks.http.app)
        .post('/add')
        .send({ sentence: 'test' })
        .expect(302)
        .expect('location','/say', done);
    });
  });

});
