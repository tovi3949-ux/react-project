import axios from "axios";
import { BASE_URL } from "./URL";
import type { User } from "../types/user";
import { apiwithToken } from "./http";
console.log("BASE_URL:", BASE_URL);
const URL =  BASE_URL+'/auth';
console.log("Auth URL:", URL);
const Login= async (data: { email: string; password: string }): Promise<{token:string,user: User}> => {
    const response = await axios.post(`${URL}/login`, data);
    return response.data;
}

const Register= async (data: { name: string; email: string; password: string }): Promise<{token:string,user: User}> => {
    const response = await axios.post(`${URL}/register`, data);
    return response.data;
}
const Me= async (): Promise<User> => {
    const response = await apiwithToken.get(`${URL}/me`);
    return response.data;
}

export { Login, Register, Me };