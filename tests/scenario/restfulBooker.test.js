import {
    assert
} from "chai";
import RestfulAPI from "$root/page/restful.api";
import * as data from "$root/data/user.data"
import * as book from "$root/data/booking.data"


var authToken
var bookingId

describe("Ping API Endpoint", () => {
    it("Ping to api endpoint to make sure that server is online", async () => {
        const response = await RestfulAPI.ping();
        assert.equal(response.status, 201);
        assert.isString(response.data);
        assert.equal(response.data, "Created")
    })
});

describe('Create Auth Token', () => {
    it("Create auth token using valid data", async () => {
        const response = await RestfulAPI.createToken(data.VALID_DATA);
        authToken = response.data.token
        // expect(response).to.equal('promise resolved'); 
        // console.log(response);
        assert.equal(response.status, 200);
        assert.containsAllKeys(response.data, ["token"]);
        assert.isString(authToken);
        assert.equal(authToken.length, data.VALID_DATA_RESPONSE.token.length)
        console.log("    ✔ Your access token " + authToken + "")
    });

    it("Create auth token using invalid data", async () => {
        const response = await RestfulAPI.createToken(data.INVALID_DATA);

        assert.equal(response.status, 200)
        assert.containsAllKeys(response.data, ["reason"]);
        assert.isString(response.data.reason);
        assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
    });

    it("Create auth token with blank data", async () => {
        const response = await RestfulAPI.createToken(data.BLANK_DATA)

        assert.equal(response.status, 200)
        assert.containsAllKeys(response.data, ["reason"]);
        assert.isString(response.data.reason);
        assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
    })
});

describe("Booking", () => {
    // Create Booking Using Valid Data
    it("Create booking with valid data", async () => {
        const response = await RestfulAPI.createBooking(book.CREATE_BOOKING)
        // console.log(response.data)
        bookingId = response.data.bookingid;
        assert.equal(response.status, 200)
        assert.containsAllKeys(response.data, ["bookingid", "booking"]);
        assert.isNumber(response.data.bookingid);
        assert.isObject(response.data.booking)
        assert.equal(response.data.booking.firstname, book.CREATE_BOOKING.firstname);
        console.log("    ✔ Your booking id " + bookingId + "")
        // assert.containsAllKeys()
        // console.log(response.data)
    })

    // Get Booking Data using Id
    it('Get Booking data using id', async () => {
        const response = await RestfulAPI.getBookingById(bookingId);
        assert.equal(response.status, 200)
        assert.isObject(response.data)
        assert.containsAllKeys(response.data, [
            "firstname",
            "lastname",
            "totalprice",
            "depositpaid",
            "bookingdates",
            "additionalneeds"
        ]);
    })

    /*
    Get Booking Data Using Filter firstname and lastname
    */
    it('Get Booking data using firstname and lastname', async () => {
        const response = await RestfulAPI.getBookingByName(book.FILTER_BOOKING.firstname, book.FILTER_BOOKING.lastname);
        assert.equal(response.status, 200)
        assert.isArray(response.data);
        assert.containsAllKeys(response.data[0], ["bookingid"])
        assert.isNumber(response.data[0].bookingid);

        const searchData = await RestfulAPI.getBookingById(response.data[0].bookingid);
        assert.equal(searchData.status, 200)
        assert.isObject(searchData.data);
        assert.containsAllKeys(searchData.data, [
            "firstname",
            "lastname",
            "totalprice",
            "depositpaid",
            "bookingdates",
            "additionalneeds"
        ]);
        assert.equal(searchData.data.firstname, book.FILTER_BOOKING.firstname)
    })

    /*
    Update booking data by id, in this scenario we use update on total price and checkout
    */
    it('Update booking data by id', async () => {
        const response = await RestfulAPI.updateBooking(bookingId, book.UPDATE_BOOKING);
        assert.equal(response.status, 200)
        assert.isObject(response.data);
        assert.containsAllKeys(response.data, [
            "firstname",
            "lastname",
            "totalprice",
            "depositpaid",
            "bookingdates",
            "additionalneeds"
        ]);
        assert.equal(response.data.totalprice, book.UPDATE_BOOKING.totalprice)
        assert.equal(response.data.bookingdates.checkout, book.UPDATE_BOOKING.bookingdates.checkout)
    })

    /*
    Update booking data by id without authorization token, in this scenario we use update on total price and checkout
    */
    it('Update booking data by id without authorization token', async () => {
        const response = await RestfulAPI.updateBookingWithoutAuth(bookingId, book.UPDATE_BOOKING);
        assert.equal(response.status, 403)
        assert.equal(response.data, "Forbidden");
    })

    /*
    Delete Booking Data
    */
    it('Delete Booking Data by ID', async () => {
        const response = await RestfulAPI.deleteBooking(bookingId);
        assert.equal(response.status, 201)
        assert.isString(response.data);
        assert.equal(response.data, "Created")
    })

    /*
    Update booking data by id without authorization token, in this scenario we use update on total price and checkout
    */
    it('Update booking data using unregistered id ', async () => {
        const response = await RestfulAPI.updateBooking(bookingId, book.UPDATE_BOOKING);
        assert.equal(response.status, 405)
        assert.equal(response.data, "Method Not Allowed");
    })


})