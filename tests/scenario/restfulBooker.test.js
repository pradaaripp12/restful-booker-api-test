import chai, {
    assert,
    expect
} from "chai";
import jsonSchema from "chai-json-schema";
import RestfulAPI from "$root/page/restful.api";
import * as data from "$root/data/user.data";
import * as book from "$root/data/booking.data";
import * as schema from "$root/schema/data.schema";
import {
    getParams
} from "$root/helper/lib-api";

var authToken;
var bookingId;
var bookingIdNew;

chai.use(jsonSchema);

describe("Ping API Endpoint", () => {
    it("Ping to api endpoint to make sure that server is online", async () => {
        const response = await RestfulAPI.ping();

        assert.equal(response.status, 201);
        assert.isString(response.data);
        assert.equal(response.data, "Created");
    });
});

describe("Create Auth Token", () => {
    //create test case with positif case
    describe("Positive Case", () => {
        it("Create auth token with registered data", async () => {
            const response = await RestfulAPI.createToken(data.VALID_REGISTERED);

            authToken = response.data.token;
            assert.equal(response.status, 200);
            assert.equal(authToken.length, data.VALID_DATA_RESPONSE.token.length);
            expect(response.data).to.be.jsonSchema(schema.VALID_CREATE_AUTH_PARAMS);
        });
    });

    describe("Negative Case", () => {
        it("Create auth token with username registered and password empty", async () => {
            const response = await RestfulAPI.createToken(data.VALID_USERNAME_WITH_EMPTY_PASSWORD);

            assert.equal(response.status, 200)
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
            expect(response.data).to.be.jsonSchema(schema.INVALID_CREATE_AUTH_PARAMS);
        });

        it("Create auth token with username registered and password not registered", async () => {
            const response = await RestfulAPI.createToken(data.VALID_USERNAME_WITH_INVALID_PASSWORD);

            assert.equal(response.status, 200)
            expect(response.data).to.be.jsonSchema(schema.INVALID_CREATE_AUTH_PARAMS);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
        it("Create auth token with username and password not registered", async () => {
            const response = await RestfulAPI.createToken(data.INVALID_USERNAME_AND_PASSWORD);

            assert.equal(response.status, 200)
            expect(response.data).to.be.jsonSchema(schema.INVALID_CREATE_AUTH_PARAMS);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
        it("Create auth token with username not registered and password registered", async () => {
            const response = await RestfulAPI.createToken(data.INVALID_USERNAME_WITH_VALID_PASSWORD);

            assert.equal(response.status, 200)
            expect(response.data).to.be.jsonSchema(schema.INVALID_CREATE_AUTH_PARAMS);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
        it("Create auth token with username not registered and password empty", async () => {
            const response = await RestfulAPI.createToken(data.INVALID_USERNAME_WITH_EMPTY_PASSWORD);

            assert.equal(response.status, 200)
            assert.containsAllKeys(response.data, ["reason"]);
            assert.isString(response.data.reason);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
        it("Create auth token with username empty and password registered", async () => {
            const response = await RestfulAPI.createToken(data.EMPTY_USERNAME_WITH_VALID_PASSWORD);

            assert.equal(response.status, 200)
            assert.containsAllKeys(response.data, ["reason"]);
            assert.isString(response.data.reason);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
        it("Create auth token with username empty and password not registered", async () => {
            const response = await RestfulAPI.createToken(data.EMPTY_USERNAME_WITH_INVALID_PASSWORD);

            assert.equal(response.status, 200)
            assert.containsAllKeys(response.data, ["reason"]);
            assert.isString(response.data.reason);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
        it("Create auth token with username empy and password empty", async () => {
            const response = await RestfulAPI.createToken(data.EMPTY_BOTH);

            assert.equal(response.status, 200)
            assert.containsAllKeys(response.data, ["reason"]);
            assert.isString(response.data.reason);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
    });
});

describe("Booking", () => {
    // Create Booking Using Valid Data
    describe("Create Booking Positive Case", () => {
        it("Create booking using valid type data", async () => {
            const response = await RestfulAPI.createBooking(book.VALID_BOOKING_DATA);
            // console.log(response.data)
            bookingId = response.data.bookingid;
            assert.equal(response.status, 200);
            expect(response.data).to.be.jsonSchema(schema.VALID_BOOKING_DATA_PARAMS);
        });
    });

    describe("Get Booking By Id ", () => {
        describe("Positive Case", () => {
            it("Get booking with valid id ", async () => {
                const response = await RestfulAPI.getBookingById(bookingId);
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_ID_PARAMS);
            })
        });
        describe("Negative Case", () => {
            it("Get booking with non-valid id ", async () => {
                const response = await RestfulAPI.getBookingById(88888);
                assert.equal(response.status, 404);
                assert.equal(response.data, "Not Found");
            })
        });
    });

    describe("Get Booking Using Filter", () => {
        const filterList = book.FILTER_BOOKING_PARAMS;
        describe("Positive Case", () => {
            it("Get list booking using filter by firstname", async () => {
                const params = (({
                    firstname
                }) => ({
                    firstname
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_FILTER_PARAMS);
            });

            it("Get list booking using filter by lastname", async () => {
                const params = (({
                    lastname
                }) => ({
                    lastname
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_FILTER_PARAMS);
            });

            it("Get list booking using filter by checkout", async () => {
                const params = (({
                    checkout,
                }) => ({
                    checkout,
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_FILTER_PARAMS);
            });

            it("Get list booking using filter by firstname and lastname", async () => {
                const params = (({
                    firstname,
                    lastname
                }) => ({
                    firstname,
                    lastname
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_FILTER_PARAMS);
            });

            it("Get list booking using filter by firstname and checkout", async () => {
                const params = (({
                    firstname,
                    checkout,
                }) => ({
                    firstname,
                    checkout,
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_FILTER_PARAMS);
            });

            it("Get list booking using filter by lastname and checkout", async () => {
                const params = (({
                    lastname,
                    checkout,
                }) => ({
                    lastname,
                    checkout,
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_FILTER_PARAMS);
            });

            it("Get list booking using filter by firstname, lastname, and checkout", async () => {
                const params = (({
                    firstname,
                    lastname,
                    checkout,
                }) => ({
                    firstname,
                    lastname,
                    checkout,
                }))(filterList)
                const response = await RestfulAPI.getBookingFilter(params)
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_FILTER_PARAMS);
            });
        });

        describe("Negative Case", () => {
            const filterWrongList = book.FILTER_BOOKING_WRONGS_DATA
            it('Get list booking using wrong firstname filter', async () => {
                const params = (({
                    firstname
                }) => ({
                    firstname
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it('Get list booking using wrong lastName filter', async () => {
                const params = (({
                    lastname
                }) => ({
                    lastname
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using wrong checkout filter ", async () => {
                const params = (({
                    checkout
                }) => ({
                    checkout
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using wrong firstname and lastname filter ", async () => {
                const params = (({
                    firstname,
                    lastname,
                }) => ({
                    firstname,
                    lastname,
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using wrong firtstname and checkout dates filter ", async () => {
                const params = (({
                    firstname,
                    checkout
                }) => ({
                    firstname,
                    checkout
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using wrong lastname and checkout dates filter ", async () => {
                const params = (({
                    lastname,
                    checkout
                }) => ({
                    lastname,
                    checkout
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using filter wrong firstname, lastname, and checkout", async () => {
                const params = filterWrongList;
                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

        });

    });

    describe("Update Booking", () => {
        describe("Positive Case", () => {
            it("Update booking data with valid id", async () => {
                const response = await RestfulAPI.updateBooking(
                    bookingId,
                    book.UPDATE_BOOKING
                );
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_ID_PARAMS);
            });
        });

        describe("Negative Case", () => {
            it("Update booking data with valid id without authorization token", async () => {
                const response = await RestfulAPI.updateBookingWithoutAuth(
                    bookingId,
                    book.UPDATE_BOOKING
                );
                assert.equal(response.status, 403);
                assert.equal(response.data, "Forbidden");
            });

            before(async function () {
                // runs once after the last test in this block
                const response = await RestfulAPI.deleteBooking(bookingId);
                // console.log(response.data);
            });

            it("Update booking data using unregistered id ", async () => {
                const response = await RestfulAPI.updateBooking(
                    bookingId,
                    book.UPDATE_BOOKING
                );
                assert.equal(response.status, 405);
                assert.equal(response.data, "Method Not Allowed");
            });
        })
    })

    describe("Partial Update Booking", () => {
        const partialData = book.PARTIAL_UPDATE_BOOKING;

        before(async function () {
            // runs once after the last test in this block
            const response = await RestfulAPI.createBooking(book.VALID_BOOKING_DATA);
            bookingIdNew = response.data.bookingid;
            // console.log(response.data);
        });

        describe("Positive Case", () => {
            it("Partial Update booking data by firstname", async () => {
                const params = (({
                    firstname,
                }) => ({
                    firstname,
                }))(partialData);
                const response = await RestfulAPI.partialUpdateBooking(
                    bookingIdNew,
                    params
                );
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_ID_PARAMS);
            });

            it("Partial Update booking data by lastname", async () => {
                const params = (({
                    lastname,
                }) => ({
                    lastname,
                }))(partialData);
                const response = await RestfulAPI.partialUpdateBooking(
                    bookingIdNew,
                    params
                );
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_ID_PARAMS);
            });

            it("Partial Update booking data by totalprice", async () => {
                const params = (({
                    totalprice,
                }) => ({
                    totalprice,
                }))(partialData);
                const response = await RestfulAPI.partialUpdateBooking(
                    bookingIdNew,
                    params
                );
                assert.equal(response.status, 200);
                
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_ID_PARAMS);
            });
            it("Partial Update booking data by depositpaid", async () => {
                const params = (({
                    depositpaid,
                }) => ({
                    depositpaid,
                }))(partialData);
                const response = await RestfulAPI.partialUpdateBooking(
                    bookingIdNew,
                    params
                );
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_ID_PARAMS);
            });

            it("Partial Update booking data by bookingdates", async () => {
                const params = (({
                    checkin,
                    checkout,
                }) => ({
                    checkin,
                    checkout
                }))(partialData);
                const response = await RestfulAPI.partialUpdateBooking(
                    bookingIdNew, {
                        "bookingdates": params
                    }
                );
                // console.log(response.data)
                assert.equal(response.status, 200);
                expect(response.data).to.be.jsonSchema(schema.VALID_GET_BOOKING_DATA_BY_ID_PARAMS);
            });
        });

        describe("Negative Case", () => {
            it("Update booking data with valid id without authorization token", async () => {
                const response = await RestfulAPI.updateBookingWithoutAuth(
                    bookingIdNew,
                    book.UPDATE_BOOKING
                );
                assert.equal(response.status, 403);
                assert.isString(response.data);
                assert.equal(response.data, "Forbidden");
            });

            it("Update booking data using unregistered id ", async () => {
                const response = await RestfulAPI.partialUpdateBooking(
                    bookingId,
                    book.UPDATE_BOOKING
                );
                assert.equal(response.status, 405);
                assert.isString(response.data);
                assert.equal(response.data, "Method Not Allowed");
            });
        })
    });

    describe("Delete Booking Data", () => {
        describe("Positive Case", () => {
            it("Delete booking data using valid id ", async () => {
                const response = await RestfulAPI.deleteBooking(bookingIdNew);
                assert.equal(response.status, 201);
                assert.isString(response.data);
                assert.equal(response.data, "Created");
            });
        })
        describe("Negative Case Case", () => {
            it("Delete booking data with valid id without authorization token", async () => {
                const response = await RestfulAPI.deleteBookingWithoutAuth(
                    bookingIdNew
                );
                assert.equal(response.status, 403);
                assert.isString(response.data);
                assert.equal(response.data, "Forbidden");
            });
            it("Delete booking data using unregistered id", async () => {
                const response = await RestfulAPI.deleteBooking(
                    bookingIdNew)
                assert.equal(response.status, 405);
                assert.isString(response.data);
                assert.equal(response.data, "Method Not Allowed");
            });
        })
    })
});