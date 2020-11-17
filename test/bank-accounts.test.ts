var Mochachai = require('chai'); // import * as chai from 'chai';
var request = require('request');
var chaiHttp = require('chai-http'); // import chaiHttp = require('chai-http');
var expect = require('chai').expect;

const hostUrl = 'http://localhost:2020/api';
const urls = {
    getSelectedAccount: '/bank-account/get-account',
    getAllBankAccounts: '/bank-account/get-all-accounts'
}
const getSelectedAcc = {
    "voicePattern": "selvamani"
};

Mochachai.use(chaiHttp);

describe('Bank Accounts Controller API Unit Testing', () => {

    // Get selected Bank Account
    it('Get selected Bank Account Detail', (done) => {
        let bankAccount = hostUrl + urls.getSelectedAccount;
        let reqBody = getSelectedAcc;
        Mochachai.request(bankAccount).post('/').send(reqBody)
            .end((err, res) => {
                const resultCode = res.statusCode;
                const resultType = res.type;
                expect(resultCode).to.equal(200);
                expect(resultType).to.eql('application/json');
                expect(res.body.result).to.equal('success');
                done()
            });
    });

    // get All Bank accounts
    it('Fetch All Bank accounts', (done) => {
        let getAllaccounts = hostUrl + urls.getAllBankAccounts;
        Mochachai.request(getAllaccounts)
            .get('/')
            .end((err, res) => {
                const result = res.statusCode
                expect(result).to.equal(200);
                expect(res.type).to.eql('application/json');
                expect(res.body.result).to.equal('success');
                done();
            })
    });
})


