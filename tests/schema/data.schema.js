export const VALID_CREATE_AUTH_PARAMS = {
    "type": "object",
    "default": {},
    "required": [
        "token"
    ],
    "properties": {
        "token": {
            "type": "string",
            "default": ""
        }
    }
}
export const INVALID_CREATE_AUTH_PARAMS = {
    "type": "object",
    "default": {},
    "required": [
        "reason"
    ],
    "properties": {
        "reason": {
            "type": "string",
            "default": ""
        }
    }
}

export const VALID_BOOKING_DATA_PARAMS = {
    "type": "object",
    "default": {},
    "required": [
        "bookingid",
        "booking"
    ],
    "properties": {
        "bookingid": {
            "type": "integer",
            "default": 0
        },
        "booking": {
            "type": "object",
            "default": {},
            "required": [
                "firstname",
                "lastname",
                "totalprice",
                "depositpaid",
                "bookingdates",
                "additionalneeds"
            ],
            "properties": {
                "firstname": {
                    "type": "string",
                    "default": ""
                },
                "lastname": {
                    "type": "string",
                    "default": ""
                },
                "totalprice": {
                    "type": "integer",
                    "default": 0
                },
                "depositpaid": {
                    "type": "boolean",
                    "default": false
                },
                "bookingdates": {
                    "type": "object",
                    "default": {},
                    "required": [
                        "checkin",
                        "checkout"
                    ],
                    "properties": {
                        "checkin": {
                            "type": "string",
                            "default": ""
                        },
                        "checkout": {
                            "type": "string",
                            "default": ""
                        }
                    }
                },
                "additionalneeds": {
                    "type": "string",
                    "default": ""
                }
            }
        }
    }
}

export const VALID_GET_BOOKING_DATA_BY_ID_PARAMS = {
    "type": "object",
    "default": {},
    "required": [
        "firstname",
        "lastname",
        "totalprice",
        "depositpaid",
        "bookingdates",
        "additionalneeds"
    ],
    "properties": {
        "firstname": {
            "type": "string",
            "default": ""
        },
        "lastname": {
            "type": "string",
            "default": ""
        },
        "totalprice": {
            "type": "integer",
            "default": 0
        },
        "depositpaid": {
            "type": "boolean",
            "default": false
        },
        "bookingdates": {
            "type": "object",
            "default": {},
            "required": [
                "checkin",
                "checkout"
            ],
            "properties": {
                "checkin": {
                    "type": "string",
                    "default": ""
                },
                "checkout": {
                    "type": "string",
                    "default": ""
                }
            }
        },
        "additionalneeds": {
            "type": "string",
            "default": ""
        }
    }
}

export const VALID_GET_BOOKING_DATA_BY_FILTER_PARAMS = {
    "type": "array",
    "default": []
}