/* eslint-env mocha */

const assert = require("assert");
const requestTime = require("../lib/request-time")

describe("request-time middleware", function(){
    it("should add a request time propert to the req / timestamp added to req", function(){
        req = {};
        requestTime(req, null, ()=>{
            assert.ok(req.requestTime > 0);
        })
    })
})