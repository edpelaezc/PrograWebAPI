let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Lista de entidades de suscripción :', () => {
    it('La respueta es diferente a un arreglo.', (done) => {
        chai.request(url)
            .get('/subscription/6085037f1f047634e05c76db')
            .send()
            .end((err, res) => {
                expect(res.body.length < 0);
                done();
            });
    });
});

describe('Lista de entidades de suscripción :', () => {
    it('La respuesta es un arreglo', (done) => {
        chai.request(url)
            .get('/subscription/6085037f1f047634e05c76db')
            .send()
            .end((err, res) => {
                expect(res.body).to.be.an('array')
                done();
            });
    });
});

describe('Crear suscripción de café:', () => {
    it('Debería crear una entidad de suscripción de café. ', (done) => {
        chai.request(url)
            .post('/subscription/create')
            .send(
                {
                    "userId": "string",
                    "categoria": "string",
                    "cantidad": 0,
                    "frecuencia": 0
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Error al crear')
                done();
            });
    });
});

describe('Editar suscripción de café:', () => {
    it('Debería editar una entidad de suscripción de café. ', (done) => {
        chai.request(url)
            .put('/subscription/update/6086509d5b11073540f25358')
            .send(
                {
                    "userId": "string",
                    "categoria": "string",
                    "cantidad": 0,
                    "frecuencia": 0
                })
            .end((err, res) => {
                assert.equal(res.status, 200, 'error al editar suscripción')
                done();
            });
    });
});


describe('Eliminar suscripción de café:', () => {
    it('Debería falllar al eliminar una entidad de suscripción de café que no existe. ', (done) => {
        chai.request(url)
            .delete('/subscription/delete/6089d5b11073540f25358')
            .send()
            .end((err, res) => {
                assert.equal(res.status, 500, 'eliminar suscripción')
                done();
            });
    });
});