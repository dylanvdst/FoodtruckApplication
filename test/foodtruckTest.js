var chai = require('chai');
var request = require('request');

var expect = chai.expect;

describe('Foodtruck API test', function () {
    describe('Test the tests', function () {
        it('expect fail', function () {
            expect(5).to.equal(1);
            done();
        });
        it('expect pass', function () {
            expect(5).to.equal(5);
        });
    });
    describe('Get one foodtruck', function () {
        var url = "http://localhost:3000/v1/foodtruck/59970466d4121918f48df0a9"
        it('returns status code 200', function () {
            request(url, function (err, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('returns an object', function () {
            request(url, function (err, response, body) {
                expect(body.substring(0, 1)).contain('{');
                done();
            });
        });
        it('returns a foodtruck', function () {
            request(url, function (err, response, body) {
                expect(body).contain('name');
                done();
            });
        });
    });
    describe('Get all foodtrucks', function () {
        var url = "http://localhost:3000/v1/foodtruck/"
        it('returns status code 200', function () {
            request(url, function (err, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('returns a list', function () {
            request(url, function (err, response, body) {
                expect(body.substring(0, 1)).contain('[');
                done();
            });
        });
        it('contains foodtrucks', function(){
            request(url, function(err, response, body){
                expect(body).contain('name');
                done();
            });
        });
    });
});

