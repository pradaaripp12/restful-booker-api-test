import {
    assert
} from "chai";
import RestfulAPI from "$root/page/restful.api";
import * as data from "$root/data/user.data";
import * as book from "$root/data/booking.data";
import {
    getParams
} from "$root/helper/lib-api";

var authToken;
var bookingId;

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
            // expect(response).to.equal('promise resolved');
            // console.log(response);
            assert.equal(response.status, 200);
            assert.containsAllKeys(response.data, ["token"]);
            assert.isString(authToken);
            assert.equal(authToken.length, data.VALID_DATA_RESPONSE.token.length);
            // console.log("    ✔ Your access token " + authToken + "")
        });
    });

    describe("Negative Case", () => {
        it("Create auth token with username registered and password empty", async () => {
            const response = await RestfulAPI.createToken(data.VALID_USERNAME_WITH_EMPTY_PASSWORD);

            assert.equal(response.status, 200)
            assert.containsAllKeys(response.data, ["reason"]);
            assert.isString(response.data.reason);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });

        it("Create auth token with username registered and password not registered", async () => {
            const response = await RestfulAPI.createToken(data.VALID_USERNAME_WITH_INVALID_PASSWORD);

            assert.equal(response.status, 200)
            assert.containsAllKeys(response.data, ["reason"]);
            assert.isString(response.data.reason);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
        it("Create auth token with username and password not registered", async () => {
            const response = await RestfulAPI.createToken(data.INVALID_USERNAME_AND_PASSWORD);

            assert.equal(response.status, 200)
            assert.containsAllKeys(response.data, ["reason"]);
            assert.isString(response.data.reason);
            assert.equal(response.data.reason, data.INVALID_DATA_RESPONSE.reason);
        });
        it("Create auth token with username not registered and password registered", async () => {
            const response = await RestfulAPI.createToken(data.INVALID_USERNAME_WITH_VALID_PASSWORD);

            assert.equal(response.status, 200)
            assert.containsAllKeys(response.data, ["reason"]);
            assert.isString(response.data.reason);
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
            assert.containsAllKeys(response.data, ["bookingid", "booking"]);
            assert.isNumber(response.data.bookingid);
            assert.isObject(response.data.booking);
            assert.equal(
                response.data.booking.firstname,
                book.VALID_BOOKING_DATA.firstname
            );
            // console.log("    ✔ Your booking id " + bookingId + "");
        });
    });

    describe("Get Booking By Id ", () => {
        describe("Positive Case", () => {
            it("Get booking with valid id ", async () => {
                const response = await RestfulAPI.getBookingById(bookingId);
                assert.equal(response.status, 200);
                assert.isObject(response.data);
                assert.containsAllKeys(response.data, [
                    "firstname",
                    "lastname",
                    "totalprice",
                    "depositpaid",
                    "bookingdates",
                    "additionalneeds",
                ]);
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
                assert.isArray(response.data);

            });

            it("Get list booking using filter by lastname", async () => {
                const params = (({
                    lastname
                }) => ({
                    lastname
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using filter by bookingdates", async () => {
                const params = (({
                    checkin,
                    checkout
                }) => ({
                    checkin,
                    checkout
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
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
                assert.isArray(response.data);
            });

            it("Get list booking using filter by firstname and bookingdates", async () => {
                const params = (({
                    firstname,
                    checkin,
                    checkout
                }) => ({
                    firstname,
                    checkin,
                    checkout
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using filter by lastname and bookingdates", async () => {
                const params = (({
                    lastname,
                    checkin,
                    checkout
                }) => ({
                    lastname,
                    checkin,
                    checkout
                }))(filterList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using filter by firstname, lastname, and bookingdates", async () => {
                const params = (({
                    firstname,
                    lastname,
                    checkin,
                    checkout
                }) => ({
                    firstname,
                    lastname,
                    checkin,
                    checkout
                }))(filterList)
                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });
        });

        describe("Negative Case", () => {
            const filterWrongList = book.BOOKING_WRONG_PARAMS
            const filterWrongNameList = book.BOOKING_WRONG_NAME_PARAMS
            const filterWrongDateList = book.BOOKING_WRONG_DATE_PARAMS
            it('Get list ordering using wrong firstName filter', async () => {
                const params = (({
                    firstname
                }) => ({
                    firstname
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it('Get list ordering using wrong lastName filter', async() => {
                const params = (({
                    lastname
                }) => ({
                    lastname
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking using wrong checkin filter ", async () => {
                const params = (({
                    checkin
                }) => ({
                    checkin
                }))(filterWrongList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking without using filter by checkout", async () => {
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
                    checkin,
                    checkout
                }) => ({
                    firstname,
                    lastname,
                    checkin,
                    checkout
                }))(filterWrongNameList)

                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });



            it("Get list booking using wrong booking dates filter ", async () => {
                const params = (({
                    firstname,
                    lastname,
                    checkin,
                    checkout
                }) => ({
                    firstname,
                    lastname,
                    checkin,
                    checkout
                }))(filterWrongDateList)

                const response = await RestfulAPI.getBookingFilter(null)
                assert.equal(response.status, 200);
                assert.isArray(response.data);
            });

            it("Get list booking without using filter by firstname, lastname, and bookingdates", async () => {
                const params = (({
                }) => ({
                }))(filterList)
                const response = await RestfulAPI.getBookingFilter(params)
                assert.equal(response.status, 200);
                assert.isArray(response.data, "No Content");
            });

        });








    })

    // it("Create booking with valid data", async () => {
    //     const response = await RestfulAPI.createBooking(book.CREATE_BOOKING);
    //     // console.log(response.data)
    //     bookingId = response.data.bookingid;
    //     assert.equal(response.status, 200);
    //     assert.containsAllKeys(response.data, ["bookingid", "booking"]);
    //     assert.isNumber(response.data.bookingid);
    //     assert.isObject(response.data.booking);
    //     assert.equal(
    //         response.data.booking.firstname,
    //         book.CREATE_BOOKING.firstname
    //     );
    //     console.log("    ✔ Your booking id " + bookingId + "");
    //     // assert.containsAllKeys()
    //     // console.log(response.data)
    // });

    // // Get Booking Data using Id
    // it("Get Booking data using id", async () => {
    //     const response = await RestfulAPI.getBookingById(bookingId);
    //     assert.equal(response.status, 200);
    //     assert.isObject(response.data);
    //     assert.containsAllKeys(response.data, [
    //         "firstname",
    //         "lastname",
    //         "totalprice",
    //         "depositpaid",
    //         "bookingdates",
    //         "additionalneeds",
    //     ]);
    // });

    // /*
    //   Get Booking Data Using Filter firstname and lastname
    //   */
    // it("Get Booking data using firstname and lastname", async () => {
    //     const response = await RestfulAPI.getBookingByName(
    //         book.FILTER_BOOKING.firstname,
    //         book.FILTER_BOOKING.lastname
    //     );
    //     assert.equal(response.status, 200);
    //     assert.isArray(response.data);
    //     assert.containsAllKeys(response.data[0], ["bookingid"]);
    //     assert.isNumber(response.data[0].bookingid);

    //     const searchData = await RestfulAPI.getBookingById(
    //         response.data[0].bookingid
    //     );
    //     assert.equal(searchData.status, 200);
    //     assert.isObject(searchData.data);
    //     assert.containsAllKeys(searchData.data, [
    //         "firstname",
    //         "lastname",
    //         "totalprice",
    //         "depositpaid",
    //         "bookingdates",
    //         "additionalneeds",
    //     ]);
    //     assert.equal(searchData.data.firstname, book.FILTER_BOOKING.firstname);
    // });

    // /*
    //   Full Update booking data by id
    //   */
    // it("Update booking data by id", async () => {
    //     const response = await RestfulAPI.updateBooking(
    //         bookingId,
    //         book.UPDATE_BOOKING
    //     );
    //     assert.equal(response.status, 200);
    //     assert.isObject(response.data);
    //     assert.containsAllKeys(response.data, [
    //         "firstname",
    //         "lastname",
    //         "totalprice",
    //         "depositpaid",
    //         "bookingdates",
    //         "additionalneeds",
    //     ]);
    //     assert.equal(response.data.totalprice, book.UPDATE_BOOKING.totalprice);
    //     assert.equal(
    //         response.data.bookingdates.checkout,
    //         book.UPDATE_BOOKING.bookingdates.checkout
    //     );
    // });

    // /*
    //   Partial Update booking data by id
    //   */
    // it("Partial Update booking data by id", async () => {
    //     const response = await RestfulAPI.partialUpdateBooking(
    //         bookingId,
    //         book.PARTIAL_UPDATE_BOOKING
    //     );
    //     assert.equal(response.status, 200);
    //     assert.isObject(response.data);
    //     assert.containsAllKeys(response.data, [
    //         "firstname",
    //         "lastname",
    //         "totalprice",
    //         "depositpaid",
    //         "bookingdates",
    //         "additionalneeds",
    //     ]);
    //     assert.equal(
    //         response.data.firstname,
    //         book.PARTIAL_UPDATE_BOOKING.firstname
    //     );
    //     assert.equal(response.data.lastname, book.PARTIAL_UPDATE_BOOKING.lastname);
    // });
    // /*
    //   Update booking data by id without authorization token, in this scenario we use update on total price and checkout
    //   */
    // it("Update booking data by id without authorization token", async () => {
    //     const response = await RestfulAPI.updateBookingWithoutAuth(
    //         bookingId,
    //         book.UPDATE_BOOKING
    //     );
    //     assert.equal(response.status, 403);
    //     assert.equal(response.data, "Forbidden");
    // });

    // /*
    //   Delete Booking Data
    //   */
    // it("Delete Booking Data by ID", async () => {
    //     const response = await RestfulAPI.deleteBooking(bookingId);
    //     assert.equal(response.status, 201);
    //     assert.isString(response.data);
    //     assert.equal(response.data, "Created");
    // });

    // /*
    //   Update booking data by id without authorization token, in this scenario we use update on total price and checkout
    //   */
    // it("Update booking data using unregistered id ", async () => {
    //     const response = await RestfulAPI.updateBooking(
    //         bookingId,
    //         book.UPDATE_BOOKING
    //     );
    //     assert.equal(response.status, 405);
    //     assert.equal(response.data, "Method Not Allowed");
    // });
});