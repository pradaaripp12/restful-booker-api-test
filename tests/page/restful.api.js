import BaseAPI from "$root/page/base.api";
import AuthBaseAPI from "$root/page/authBase.api";


const RestfulAPI = {
    ping: () => BaseAPI.get('/ping'),
    createToken : (data) => BaseAPI.post('/auth',data)
}

export default RestfulAPI;