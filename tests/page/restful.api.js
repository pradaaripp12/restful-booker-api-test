import BaseAPI from "$root/page/base.api";
import AuthBaseAPI from "$root/page/authBase.api";


const RestfulAPI = {
    ping: () => BaseAPI.get('/ping'),
    createToken: (data) => BaseAPI.post('/auth', data),
    createBooking: (data) => AuthBaseAPI.post('/booking', data),
    getBookingById: (id) => AuthBaseAPI.get(`/booking/${id}`),
    getBookingByName : (firstName, lastName) => AuthBaseAPI.get( `/booking?firstname=${firstName}&lastname=${lastName}`),
    updateBooking : (id, newData) => AuthBaseAPI.put(`/booking/${id}`, newData),
    updateBookingWithoutAuth : (id, newData) => BaseAPI.put(`/booking/${id}`, newData),
    deleteBooking: (id) => AuthBaseAPI.delete(`/booking/${id}`)

}

export default RestfulAPI;