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
    checkin: "2099-02-03",
    checkout: "2067-02-05"
}

export const FILTER_BY_FIRSTNAME = {
    "firstname": "Prada"
}

export const FILTER_WITHOUT_BY_FIRSTNAME = {
    "firstname": ""
}

export const BOOKING_WRONG_PARAMS = {
    firstname: 11223,
    lastname: 343434,
    checkin: 6.7,
    checkout: 5
}

export const BOOKING_WRONG_NAME_PARAMS = {
    firstname: 4.8,
    lastname: true,
    checkin: "2023-02-03",
    checkout: "2023-02-05"
}

export const BOOKING_WRONG_DATE_PARAMS = {
    firstname: "Prada",
    lastname: "Ari",
    checkin: true,
    checkout: 5.0
}