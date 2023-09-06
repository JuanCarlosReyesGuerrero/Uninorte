const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

//const Movie = require('../models/Movie');

const dotenv = require('dotenv').config();

describe('Pruebas sobre la API de users', () => {

    beforeAll(async () => {        
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /movie', () => {

        let response;
        beforeEach(async () => {
            response = await request(app).get('/').send();            
        })

        it('La ruta funciona', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La petición nos devuelve un array de users', async () => {
            expect(response.body).toBeInstanceOf(Array);
        });
    });
/*
    describe('POST /api/users', () => {

        const newUser = { name: 'test user', email: 'testuser@gmail.com', nickname: 'testuser', date_birth: '1980-01-01', password: 'Testuser%' };
        const wrongUser = { name: 'test user' };

        afterAll(async () => {
            await User.deleteMany({ name: 'test user' });
        });

        it('La ruta funcione', async () => {
            const response = await request(app).post('/api/users').send(newUser);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Se inserta correctamente', async () => {
            const response = await request(app).post('/api/users').send(newUser);

            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newUser.name);
        });

        it('Error en la inserción', async () => {
            const response = await request(app).post('/api/users').send(wrongUser);

            expect(response.status).toBe(500);
            expect(response.body.error).toBeDefined();
        });

    });

    describe('PUT /api/users', () => {

        let user;
        beforeEach(async () => {
            user = await User.create({ name: 'test user', email: 'testuser@gmail.com', nickname: 'testuser', date_birth: '1980-01-01', password: 'Testuser%' });
        });

        afterEach(async () => {
            await User.findByIdAndDelete(user._id);
        });

        it('La ruta funciona', async () => {
            const response = await request(app).put(`/api/users/${user._id}`).send({
                name: 'user updated'
            });

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Se actualiza correctamente', async () => {
            const response = await request(app).put(`/api/users/${user._id}`).send({
                name: 'user updated'
            });

            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('user updated');
        });

    });

    describe('DELETE /api/users', () => {

        let user;
        let response;
        beforeEach(async () => {
            user = await User.create({ name: 'test user', email: 'testuser@gmail.com', nickname: 'testuser', date_birth: '1980-01-01', password: 'Testuser%' });
            response = await request(app).delete(`/api/users/${user._id}`).send();
        });

        it('La ruta funciona', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Borra correctamente', async () => {
            expect(response.body._id).toBeDefined();

            const foundUser = await User.findById(user._id);
            expect(foundUser).toBeNull();
        })

    })
*/
});