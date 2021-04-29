let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Lista de entidades de cafe :', () => {
    it('La respueta es diferente a un arreglo.', (done) => {
        chai.request(url)
            .get('/coffee')
            .send()
            .end((err, res) => {
                expect(res.body.length < 0);
                done();
            });
    });
});

describe('Lista de entidades de cafe :', () => {
    it('La respuesta es un arreglo', (done) => {
        chai.request(url)
            .get('/coffee')
            .send()
            .end((err, res) => {
                expect(res.body).to.be.an('array')
                done();
            });
    });
});

describe('Lista de entidades de cafe para dropdown :', () => {
    it('El modelo debe contener dos propiedades. ', (done) => {
        chai.request(url)
            .get('/coffee/list')
            .send()
            .end((err, res) => {
                expect(res.body[0]).to.have.deep.property('_id')
                expect(res.body[0]).to.have.deep.property('name')
                done();
            });
    });
});

describe('Crear café:', () => {
    it('Debería crear una entidad de café. ', (done) => {
        chai.request(url)
            .post('/coffee/create')
            .send(
                {
                    "name": "Test",
                    "qty": 0,
                    "price": 0
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Creado')
                done();
            });
    });
});

describe('Editar café:', () => {
    it('Debería editar una entidad de café. ', (done) => {
        chai.request(url)
            .put('/coffee/update/6086509d5b11073540f25358')
            .send(
                {
                    "name": "Test",
                    "qty": 0,
                    "price": 0
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Cafe editado')
                done();
            });
    });
});

describe('Error Editar café:', () => {
    it('Debería fallar al editar una entidad de café. ', (done) => {
        chai.request(url)
            .put('/coffee/update/6089d5b11073540f25358')
            .send(
                {
                    "name": "Test",
                    "qty": 0,
                    "price": 0
                })
            .end((err, res) => {
                assert.equal(res.status, 500, 'Error en cafe editado')
                done();
            });
    });
});

describe('Eliminar café:', () => {
    it('Debería falllar al eliminar una entidad de café que no existe. ', (done) => {
        chai.request(url)
            .delete('/coffee/delete/6089d5b11073540f25358')
            .send()
            .end((err, res) => {
                assert.equal(res.status, 500, 'eliminar cafe')
                done();
            });
    });
});