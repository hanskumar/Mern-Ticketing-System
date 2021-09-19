import axios from 'axios';

const BaseUrl = "http://localhost:4000/v1";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

export const addTicket = (frmData) =>{

    return new Promise(async (resolve, reject) => {
        try {
            const res = await api.post(`${BaseUrl}/add-ticket`, frmData);
            resolve(res);
        
        } catch (error) {
            reject(error);
        }
    });

}


export const getTickets = (frmData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await api.post(`${BaseUrl}/login`, frmData);
    
            resolve(res);

            /* if (res.data.status === "200") {
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                    "crmSite",
                    JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
            } */
        } catch (error) {
            reject(error);
        }
    });
};