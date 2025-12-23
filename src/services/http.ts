import axios from "axios";
import { useAuth } from "../context/authStore";
import { useSnackbar } from "notistack";

const apiwithToken = axios.create();
apiwithToken.interceptors.request.use((config) => {
    const Token = useAuth.getState().token;

    if (!Token)
        throw new Error('No token found');

    config.headers.Authorization = `Bearer ${Token}`;
    return config;
});


apiwithToken.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        if(error.response && error.response.status>=500){
            const {enqueueSnackbar}=useSnackbar()
            enqueueSnackbar('שגיאה בשרת, אנא נסה שוב מאוחר יותר',{ variant: 'error' });
        }
        return Promise.reject(error);
    }
);

export { apiwithToken };