let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Lista de entidades de servicio disponible al usuario :', () => {
    it('La respueta es diferente a un arreglo.', (done) => {
        chai.request(url)
            .get('/service')
            .send()
            .end((err, res) => {
                expect(res.body.length < 0);
                done();
            });
    });
});

describe('Lista de entidades de servicio disponible al usuario :', () => {
    it('La respuesta es un arreglo', (done) => {
        chai.request(url)
            .get('/service')
            .send()
            .end((err, res) => {
                expect(res.body).to.be.an('array')
                done();
            });
    });
});

describe('Lista de entidades de servicio disponible al usuario para dropdown :', () => {
    it('El modelo debe contener dos propiedades. ', (done) => {
        chai.request(url)
            .get('/service/list')
            .send()
            .end((err, res) => {
                expect(res.body[0]).to.have.deep.property('_id')
                expect(res.body[0]).to.have.deep.property('name')
                done();
            });
    });
});

describe('Crear servicio disponible al usuario:', () => {
    it('Debería crear una entidad de servicio disponible al usuario. ', (done) => {
        chai.request(url)
            .post('/service/create')
            .send(
                {
                    "name": "string",
                    "price": 0,
                    "description": "string"
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Creado')
                done();
            });
    });
});

describe('Editar servicio disponible al usuario:', () => {
    it('Debería editar una entidad de servicio disponible al usuario. ', (done) => {
        chai.request(url)
            .put('/service/update/6086509d5b11073540f25358')
            .send(
                {
                    "name": "string",
                    "price": 0,
                    "description": "stringggga"
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'servicio disponible al usuario editado')
                done();
            });
    });
});

describe('Error Editar servicio disponible al usuario:', () => {
    it('Debería fallar al editar una entidad de servicio disponible al usuario. ', (done) => {
        chai.request(url)
            .put('/service/update/6089d5b11073540f25358')
            .send(
                {
                    "name": "string",
                    "price": 0,
                    "description": "string"
                })
            .end((err, res) => {
                assert.equal(res.status, 500, 'Error en servicio disponible al usuario editado')
                done();
            });
    });
});

describe('Eliminar servicio disponible al usuario:', () => {
    it('Debería falllar al eliminar una entidad de servicio disponible al usuario que no existe. ', (done) => {
        chai.request(url)
            .delete('/service/delete/6089d5b11073540f25358')
            .send()
            .end((err, res) => {
                assert.equal(res.status, 500, 'eliminar servicio disponible al usuario')
                done();
            });
    });
});