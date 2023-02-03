import {assert} from "chai";
import RestfulAPI from "$root/page/restful.api";
import * as data from "$root/data/user.data"
import * as book from "$root/data/booking.data"

var authToken
var bookingId

describe("Ping API Endpoint", () => {
    it("Ping to api endpoint to make sure that server is online", async() => {
        const response = await RestfulAPI.ping();

        assert.equal(response.status, 201);
    })
});

describe('Create Auth Token', () => {
    it("Create auth token using valid data", async () => {
        const response = await RestfulAPI.createToken(data.VALID_DATA);
        authToken = response.data.token

        console.log("    ✔ Your access token "+authToken+"")
        // expect(response).to.equal('promise resolved'); 
        // console.log(response);
        assert.equal(response.status, 200);
        assert.containsAllKeys(response.data, ["token"]);
        assert.isString(authToken);
        assert.equal(authToken.length, data.VALID_DATA_RESPONSE.token.length)
    });

    it("Create auth token using invalid data", async() => {
        const response = await RestfulAPI.createToken(data.INVALID_DATA);

        assert.equal(response.status, 200)
        assert.containsAllKeys(response.data, ["reason"]);
        assert.isString(response.data.reason);
        assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
    });

    it("Create auth token with blank data", async() => {
        const response = await RestfulAPI.createToken(data.BLANK_DATA)
        
        assert.equal(response.status, 200)
        assert.containsAllKeys(response.data, ["reason"]);
        assert.isString(response.data.reason);
        assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
    })
});

describe("Booking", () => {
    it("Create booking with va", async() => {
        const response = await RestfulAPI.createBooking(book.CREATE_BOOKING)
        bookingId = response.data.bookingid;
        console.log("    ✔ Your booking id "+bookingId+"")
        assert.equal(response.status, 200)
        // assert.containsAllKeys()
        // console.log(response.data)

    })
})
// describe("Ping", () => {
//     it("Check Ping API", async () => {
//         const response = await reqresApi.ping();
//         assert.equal(response.status, 201)
//     })
// })