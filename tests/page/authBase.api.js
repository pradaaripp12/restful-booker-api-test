import dotenv from 'dotenv';
import axios from 'axios';
import RestfulAPI from "$root/page/restful.api"
import * as data from "$root/data/user.data"
dotenv.config();

const AuthBaseApi = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        // "Cookie": `token=${createToken.data.token}`,
        "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
    },
    validateStatus: function () {
        return true;
    }
});

AuthBaseApi.interceptors.request.use(async function (config) {
        // Do something before request is sent
        const createToken = await RestfulAPI.createToken(data.VALID_DATA)
        config.headers.Cookie = `token=${createToken.data.token}`
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


export default AuthBaseApi;