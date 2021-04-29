let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Crear usuario:', () => {
    it('Debería crear una entidad de usuario. ', (done) => {
        chai.request(url)
            .post('/users/create')
            .send(
                {
                    "username": "string",
                    "address": "string",
                    "phone": 0,
                    "password": "string",
                    "role": "user"
                })
            .end((err, res) => {
                assert.equal(res.status, 202, 'Ya está reado')
                done();
            });
    });
});

describe('Login usuario:', () => {
    it('Iniciar sesión. ', (done) => {
        chai.request(url)
            .post('/users/login')
            .send(
                {
                    "username": "eduardo@gmail.com",
                    "password": "asdfasdf"
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Creado')
                done();
            });
    });
});