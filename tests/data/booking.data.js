export const VALID_BOOKING_DATA = {
    "firstname": "Prada",
    "lastname": "Ari",
    "totalprice": 150,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2023-02-03",
        "checkout": "2023-02-05"
    },
    "additionalneeds": "Breakfast"
}


export const UPDATE_BOOKING = {
    "firstname": "Prada",
    "lastname": "Ari",
    "totalprice": 500,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2023-02-03",
        "checkout": "2023-02-08"
    },
    "additionalneeds": "Breakfast"
}

export const PARTIAL_UPDATE_BOOKING = {
    "firstname": "Fathah",
    "lastname": "Ari Pangestu",
    "totalprice": 1000,
    "depositpaid": false,
    "checkin": "2023-02-02",
    "checkout": "2025-02-08",
    "additionalneeds": "Breakfast"
}

export const FILTER_BOOKING_PARAMS = {
    firstname: "Prada",
    lastname: "Ari",
    checkin: "2023-02-03",
    checkout: "2023-02-05"
}

export const FILTER_BOOKING_WRONGS_DATA = {
    firstname: "Subhan",
    lastname: "Ahmad",
    checkout: "2067-02-05"
}
