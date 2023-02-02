import dotenv from 'dotenv';
import axios from 'axios';
import RestfulAPI from "$root/page/restful.api"
import * as data from "$root/data/user.data"
dotenv.config();

const AuthBaseApi = async () => {
    const tokenData = await RestfulAPI.createToken(data.VALID_DATA);;
    return axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Cookie": `token=${tokenData}`
        },
        validateStatus: function () {
            return true;
        }
    });
}

export default AuthBaseApi;