let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Lista de entidades de método :', () => {
    it('La respueta es diferente a un arreglo.', (done) => {
        chai.request(url)
            .get('/method')
            .send()
            .end((err, res) => {
                expect(res.body.length < 0);
                done();
            });
    });
});

describe('Lista de entidades de método :', () => {
    it('La respuesta es un arreglo', (done) => {
        chai.request(url)
            .get('/method')
            .send()
            .end((err, res) => {
                expect(res.body).to.be.an('array')
                done();
            });
    });
});

describe('Lista de entidades de método para dropdown :', () => {
    it('El modelo debe contener dos propiedades. ', (done) => {
        chai.request(url)
            .get('/method/list')
            .send()
            .end((err, res) => {
                expect(res.body[0]).to.have.deep.property('_id')
                expect(res.body[0]).to.have.deep.property('name')
                done();
            });
    });
});

describe('Crear método:', () => {
    it('Debería crear una entidad de método. ', (done) => {
        chai.request(url)
            .post('/method/create')
            .send(
                {
                    "name": "testMethod",
                    "description": "testTest"
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Creado')
                done();
            });
    });
});

describe('Editar método:', () => {
    it('Debería editar una entidad de método. ', (done) => {
        chai.request(url)
            .put('/method/update/6086509d5b11073540f25358')
            .send(
                {
                    "name": "testMethod",
                    "description": "Prueba"
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'método editado')
                done();
            });
    });
});

describe('Error Editar método:', () => {
    it('Debería fallar al editar una entidad de método. ', (done) => {
        chai.request(url)
            .put('/method/update/6089d|5b11073540f25358')
            .send(
                {
                    "name": "asdf",
                    "description": "testTest"
                })
            .end((err, res) => {
                assert.equal(res.status, 500, 'Error en método editado')
                done();
            });
    });
});

describe('Eliminar método:', () => {
    it('Debería falllar al eliminar una entidad de método que no existe. ', (done) => {
        chai.request(url)
            .delete('/method/delete/6089d5b11073540f25358')
            .send()
            .end((err, res) => {
                assert.equal(res.status, 500, 'eliminar método')
                done();
            });
    });
});