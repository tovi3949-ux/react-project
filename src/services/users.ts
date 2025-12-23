import type { User } from "../types/user";
import type { ROLES } from "../utils/roles";
import { apiwithToken } from "./http";
import { BASE_URL } from "./URL";
const URL = BASE_URL+'/users';

const getAllUsers = async (): Promise<User[]> => {
    const response = await apiwithToken.get(URL);
    return response.data;
}
const getUserById = async (id: string): Promise<User> => {
    const response = await apiwithToken.get(`${URL}/${id}`);
    return response.data;
}
const addUser = async (data: { name: string; email: string; password: string ; role: ROLES}): Promise<User> => {
    const response = await apiwithToken.post(URL, data);
    return response.data;
}

export { getAllUsers, getUserById, addUser };    