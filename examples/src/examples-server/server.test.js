/**
 * @jest-environment node
 */

import { app } from './server';
import request from 'supertest';
import nock from 'nock';

describe('backend integration tests', () => {
  it('can execute end verify http call', () => {
    return request(app)
      .get('/hello')
      .expect(200, 'Hello');
  });

  it('can execute end verify http call with external dependency', () => {
    nock('https://api.app.com')
      .get('/resource')
      .reply(200, 'Hello from the outside');

    return request(app)
      .get('/async')
      .expect(200, 'Hello from the outside');
  });
});
