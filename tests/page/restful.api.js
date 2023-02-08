import BaseAPI from "$root/page/base.api";
import AuthBaseAPI from "$root/page/authBase.api";

const RestfulAPI = {
    ping: () => BaseAPI.get('/ping'),
    createToken: (data) => BaseAPI.post('/auth', data),
    createBooking: (data) => AuthBaseAPI.post('/booking', data),
    getBookingById: (id) => AuthBaseAPI.get(`/booking/${id}`),
    getBookingFilter: (params) => AuthBaseAPI.get(`/booking`, {params}),
    updateBooking : (id, newData) => AuthBaseAPI.put(`/booking/${id}`, newData),
    partialUpdateBooking : (id, partialData) => AuthBaseAPI.patch(`/booking/${id}`, partialData),
    partialUpdateBookingWithoutAuth : (id, partialData) => BaseAPI.patch(`/booking/${id}`, partialData),
    updateBookingWithoutAuth : (id, newData) => BaseAPI.put(`/booking/${id}`, newData),
    deleteBooking: (id) => AuthBaseAPI.delete(`/booking/${id}`),
    deleteBookingWithoutAuth: (id) => BaseAPI.delete(`/booking/${id}`)

}

export default RestfulAPI;