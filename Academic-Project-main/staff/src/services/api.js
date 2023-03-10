import axios from "axios";

const URL = "http://192.168.43.108:3001";

export const loginStaff = async (username, password) => {
    try {
        return await axios.post(`${URL}/staff/login`, {username, password});
    } catch (error) {
        console.log(error);
    }
}

export const checkAuth = async () => {
    try {
        return await axios.get(`${URL}/staff/checkauth`);
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const getNewEvents = async () => {
    try {
        return await axios.get(`${URL}/staff/events/getnewevents`);
    } catch (error) {
        console.log(error);
    }
}

export const getCurrStaff = async () => {
    try {
        return await axios.get(`${URL}/staff/currentstaff`);
    } catch (error) {
        console.log(error);
    }
}

export const bookEvent = async (data) => {
    try {
        return await axios.post(`${URL}/staff/events/bookevent`, data);
    } catch (error) {
        console.log(error);
    }
}

export const getPayments = async () => {
    try {
        return await axios.get(`${URL}/staff/events/payments`);
    } catch (error) {
        console.log(error);
    }
}

export const getAttendance = async () => {
    try {
        return await axios.get(`${URL}/staff/events/attendance`);
    } catch (error) {
        console.log(error);
    }
}

export const markAttendance = async (data) => {
    try {
        return await axios.post(`${URL}/staff/events/markattendance`, data);
    } catch (error) {
        console.log(error);
    }
}

export const cancelAttendance = async (event, staff) => {
    try {
        return await axios.delete(`${URL}/staff/events/cancelattendance`, { data: { 
            "eventName": event, 
            "Staff": staff 
        } });
        
    } catch (error) {
        console.log(error);
    }
}