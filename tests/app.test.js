const request = require('supertest');
const app = require('../src/app');

describe('GET /add', () => {

    test('returns correct sum', async () => {

        const response = await request(app)
            .get('/add?a=5&b=10');

        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(15);

    });

});
