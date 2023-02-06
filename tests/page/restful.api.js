import BaseAPI from "$root/page/base.api";
import AuthBaseAPI from "$root/page/authBase.api";

const RestfulAPI = {
    ping: () => BaseAPI.get('/ping'),
    createToken: (data) => BaseAPI.post('/auth', data),
    createBooking: (data) => AuthBaseAPI.post('/booking', data),
    getBookingById: (id) => AuthBaseAPI.get(`/booking/${id}`),
    getBookingFilter: (params) => AuthBaseAPI.get(`/booking`, {params}),
    getBookingByName : (firstName, lastName) => AuthBaseAPI.get( `/booking?firstname=${firstName}&lastname=${lastName}`),
    updateBooking : (id, newData) => AuthBaseAPI.put(`/booking/${id}`, newData),
    partialUpdateBooking : (id, partialData) => AuthBaseAPI.patch(`/booking/${id}`, partialData),
    updateBookingWithoutAuth : (id, newData) => BaseAPI.put(`/booking/${id}`, newData),
    deleteBooking: (id) => AuthBaseAPI.delete(`/booking/${id}`)

}

export default RestfulAPI;