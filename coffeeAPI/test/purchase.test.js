let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Crear orden de compra:', () => {
    it('Debería fallar crear una entidad de orden de compra. ', (done) => {
        chai.request(url)
            .post('/purchase/create')
            .send(
                {
                    "correo": "string",
                    "metodo": "string",        
                    "tamaño": "string",    
                    "variedad": "string" 
                })
            .end((err, res) => {
                assert.equal(res.status, 500, 'Orden de compra creada y enviada')
                done();
            });
    });
});