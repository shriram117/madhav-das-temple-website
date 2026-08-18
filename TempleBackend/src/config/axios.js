import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        console.log("API REQUEST:", config.url);
        console.log("JWT TOKEN:", token);

        if (token) {

            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },
    (error) => {

        return Promise.reject(error);

    }
);

export default api;