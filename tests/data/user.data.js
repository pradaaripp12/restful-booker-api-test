export const VALID_REGISTERED = {
    "username" : "admin",
    "password" : "password123"
}

export const VALID_USERNAME_WITH_EMPTY_PASSWORD = {
    "username" : "admin",
    "password" : ""
}

export const VALID_USERNAME_WITH_INVALID_PASSWORD = {
    "username" : "admin",
    "password" : "password123@@@"
}

export const INVALID_USERNAME_AND_PASSWORD = {
    "username" : "prada",
    "password" : "password123@@@"
}

export const INVALID_USERNAME_WITH_VALID_PASSWORD = {
    "username" : "prada",
    "password" : "password123"
}


export const INVALID_USERNAME_WITH_EMPTY_PASSWORD = {
    "username" : "prada",
    "password" : ""
}

export const EMPTY_USERNAME_WITH_VALID_PASSWORD = {
    "username" : "",
    "password" : "password123"
}

export const EMPTY_USERNAME_WITH_INVALID_PASSWORD = {
    "username" : "",
    "password" : "password123@@@"
}

export const EMPTY_BOTH = {
    "username" : "",
    "password" : ""
}

export const INVALID_DATA_RESPONSE = {
    "reason" : "Bad credentials"
}

export const VALID_DATA_RESPONSE = {
    "token" : "122d0bf9e908021"
}