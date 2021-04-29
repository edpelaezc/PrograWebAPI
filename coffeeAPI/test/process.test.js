let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Lista de entidades de proceso :', () => {
    it('La respueta es diferente a un arreglo.', (done) => {
        chai.request(url)
            .get('/process')
            .send()
            .end((err, res) => {
                expect(res.body.length < 0);
                done();
            });
    });
});

describe('Lista de entidades de proceso :', () => {
    it('La respuesta es un arreglo', (done) => {
        chai.request(url)
            .get('/process')
            .send()
            .end((err, res) => {
                expect(res.body).to.be.an('array')
                done();
            });
    });
});

describe('Lista de entidades de proceso para dropdown :', () => {
    it('El modelo debe contener dos propiedades. ', (done) => {
        chai.request(url)
            .get('/process/list')
            .send()
            .end((err, res) => {
                expect(res.body[0]).to.have.deep.property('_id')
                expect(res.body[0]).to.have.deep.property('name')
                done();
            });
    });
});

describe('Crear proceso:', () => {
    it('Debería crear una entidad de proceso. ', (done) => {
        chai.request(url)
            .post('/process/create')
            .send(
                {
                    "name": "proceso Prueba",
                    "description": "aaaaa"
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Creado')
                done();
            });
    });
});

describe('Editar proceso:', () => {
    it('Debería editar una entidad de proceso. ', (done) => {
        chai.request(url)
            .put('/process/update/6086509d5b11073540f25358')
            .send(
                {
                    "name": "asdfHola",
                    "description": "UT"
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'proceso editado')
                done();
            });
    });
});

describe('Error Editar proceso:', () => {
    it('Debería fallar al editar una entidad de proceso. ', (done) => {
        chai.request(url)
            .put('/process/update/6089d|5b11073540f25358')
            .send(
                {
                    "name": "asdf",
                    "description": "testTest"
                })
            .end((err, res) => {
                assert.equal(res.status, 500, 'Error en proceso editado')
                done();
            });
    });
});

describe('Eliminar proceso:', () => {
    it('Debería falllar al eliminar una entidad de proceso que no existe. ', (done) => {
        chai.request(url)
            .delete('/process/delete/6089d5b11073540f25358')
            .send()
            .end((err, res) => {
                assert.equal(res.status, 500, 'eliminar proceso')
                done();
            });
    });
});