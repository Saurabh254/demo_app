import apiClient from "./apiClient";
import { ACCESS_TOKEN_STORAGE_KEY } from "../config";
export const getRides = async () => {
    try {
        const response = await apiClient.get('/drives'); // Make a GET request to /drives
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching rides:", error);
        throw error; // Rethrow the error for further handling
    }
}


export const login_driver = async (phone, otp) => {

    try {
        const data = { 'phone': phone, 'otp': otp }
        const response = await apiClient.post('/drivers/login', data); // Make a GET request to /drives
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching rides:", error);
        throw error; // Rethrow the error for further handling
    }
}
export const login_user = async (phone, otp) => {

    try {
        const data = { 'phone': phone, 'otp': otp }
        const response = await apiClient.post('/users/login', data); // Make a GET request to /drives
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching rides:", error);
        throw error; // Rethrow the error for further handling
    }
}
export const signup_user = async (phone, otp, _name) => {
    const data = { phone, otp, name: _name };

    try {
        const response = await apiClient.post('/drivers/signup', data);
        return {
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        console.error('Signup error:', error);
        if (error.response) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        } else {
            return {
                data: { message: 'An error occurred. Please try again later.' },
                status: 500, // Internal server error
            };
        }
    }
};

export const logout_user = async () => {
    try {
        const response = await apiClient.post('/drivers/logout')
        if (response.status == 200) {
            localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
        } else {
            throw Error(`unable to logout, reason: ${response.data}`)
        }
    } catch (error) {
        console.log("Error in logout: ", error)
        throw error;
    }
}

export const get_my_vehicle = async () => {
    try {
        const response = await apiClient.get('/vehicles');
        return {
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        console.error('Signup error:', error);
        if (error.response) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        } else {
            return {
                data: { message: 'An error occurred. Please try again later.' },
                status: 500, // Internal server error
            };
        }
    }
}


export const update_vehicle_data = async (vehicle_id, data) => {
    try {
        const response = await apiClient.put(`/vehicles/${vehicle_id}`, data);
        return {
            status: response.status,
        };
    } catch (error) {
        console.error('Signup error:', error);
        if (error.response) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        } else {
            return {
                data: { message: 'An error occurred. Please try again later.' },
                status: 500, // Internal server error
            };
        }
    }
}

export const get_nearby_vehicle = async (lat, long, radius) => {
    try {
        const response = await apiClient.get(`/vehicles/nearby?latitude=${lat}&longitude=${long}&radius_km=${radius}`);
        return {
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        console.error('Signup error:', error);
        if (error.response) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        } else {
            return {
                data: { message: 'An error occurred. Please try again later.' },
                status: 500, // Internal server error
            };
        }
    }
}



export const create_drive = async (data) => {
    try {
        const response = await apiClient.post('/drives', data);
        return {
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        console.error('Signup error:', error);
        if (error.response) {
            return {
                data: error.response.data,
                status: error.response.status,
            };
        } else {
            return {
                data: { message: 'An error occurred. Please try again later.' },
                status: 500, // Internal server error
            };
        }
    }
}