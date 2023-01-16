import {User} from "../interfaces/user";

const test = require('node:test');
const supertest = require('supertest');
const assert = require('assert/strict');
const { server } = require('../server.ts');

const createdUser = {
    username: 'Hi',
    hobby: ['ski'],
    age: 30,
};

const updatedUser = {
    username: 'KY',
    hobby: ['ski'],
    age: 30,
};

test('should get users', async () => {
    await supertest(server)
        .get('/api/users')
        .expect('Content-Type', 'application/json')
        .expect(200)
        .then((res: Response) => assert(res.body, JSON.stringify([])));
});

test('should create user', async () => {
    const response = await supertest(server)
        .post('/api/users')
        .send(JSON.stringify(createdUser))
        .expect('Content-Type', 'application/json')
        .expect(201);

    assert.equal(response.body.username, createdUser.username);
    assert.deepEqual(response.body.hobby, createdUser.hobby);
    assert.equal(response.body.age, createdUser.age);
});

test('should not update user', async () => {
    await supertest(server)
        .put('/api/users/a7he7-j47fh-sf7-hn8u7')
        .send(JSON.stringify(updatedUser))
        .expect(404);
});

test('should update user', async () => {
    const created = await supertest(server)
        .post('/api/users')
        .send(JSON.stringify(createdUser))
        .expect('Content-Type', 'application/json')
        .expect(201);

    const updatedData = {
        ...updatedUser,
        id: created.body.id,
    };

    await supertest(server)
        .put(`/api/users/${created.body.id}`)
        .send(JSON.stringify(updatedData))
        .expect(200);

    const users = await supertest(server)
        .get('/api/users')
        .expect(200);

    const result = users.body?.find((user: User) => user.id === created.body.id);

    assert.deepEqual(result, updatedData);
});

test('should not delete user', async () => {
    await supertest(server)
        .delete('/api/users/a7he7-j47fh-sf7-hn8u7')
        .expect(404);
});

test('should delete user', async () => {
    const created = await supertest(server)
        .post('/api/users')
        .send(JSON.stringify(createdUser))
        .expect('Content-Type', 'application/json')
        .expect(201);

    await supertest(server)
        .delete(`/api/users/${created.body.id}`)
        .expect(204);

    const users = await supertest(server)
        .get('/api/users')
        .expect(200);

    const result = users.body?.find((user: User) => user.id === created.body.id);

    assert.equal(result, undefined);
});

test('should not get user', async () => {
    const created = await supertest(server)
        .post('/api/users')
        .send(JSON.stringify(createdUser))
        .expect('Content-Type', 'application/json')
        .expect(201);

    const user = await supertest(server)
        .get(`/api/users/${created.body.id}`)
        .expect(200);

    assert.deepEqual(user.body, created.body);
});
