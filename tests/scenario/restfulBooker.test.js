import {assert} from "chai";
import RestfulAPI from "$root/page/restful.api";
import * as data from "$root/data/user.data"

describe('Create Token', () => {
    it("Create auth token using valid data", async () => {
        const response = await RestfulAPI.createToken(data.VALID_DATA);
        // expect(response).to.equal('promise resolved'); 
        // console.log(response);
        assert.equal(response.status, 200);
        assert.containsAllKeys(response.data, ["token"]);
        assert.isString(response.data.token);
        assert.equal(response.data.token.length, 15)
    });

    it("Create auth token using invalid data", async() => {
        const response = await RestfulAPI.createToken(data.INVALID_DATA);

        assert.equal(response.status, 200)
        assert.containsAllKeys(response.data, ["reason"]);
        assert.isString(response.data.reason);
        assert.equal(response.data.reason, "Bad credentials");
    });

    it("Create auth token with blank data", async() => {
        const response = await RestfulAPI.createToken(data.BLANK_DATA)
        
        assert.equal(response.status, 200)
        assert.containsAllKeys(response.data, ["reason"]);
        assert.isString(response.data.reason);
        assert.equal(response.data.reason, "Bad credentials");
    })
});

// describe("Ping", () => {
//     it("Check Ping API", async () => {
//         const response = await reqresApi.ping();
//         assert.equal(response.status, 201)
//     })
// })