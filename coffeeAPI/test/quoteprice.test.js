let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(chaiHttp);
const url = 'http://localhost:3000/api/v1';

describe('Crear cotización:', () => {
    it('Debería fallar crear una entidad de cotización. ', (done) => {
        chai.request(url)
            .post('/quotePrice/create')
            .send(
                {
                    "correo": "string",
                    "proceso": "string",        
                    "cantidad": "string",    
                    "variedad": "string"   
                })
            .end((err, res) => {
                assert.equal(res.status, 500, 'cotización creada y enviada')
                done();
            });
    });
});

describe('Aceptación/Rechazo de cotización :', () => {
    it('Error, ya no se debe cambiar estado de cotización y alterar inventario.', (done) => {
        chai.request(url)
            .get('/quotePrice/accept/123123123k')
            .send()
            .end((err, res) => {
                assert.equal(res.status, 500, 'Fallo en la aceptación de cotización')
                done();
            });
    });
});