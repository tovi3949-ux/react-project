import type { Priority } from "../types/priority";
import { apiwithToken } from "./http";
import { BASE_URL } from "./URL";
const URL=BASE_URL+'/priorities';

const getPriorities=async(): Promise<Priority[]>=>{
    const response=await apiwithToken.get(URL);
    return response.data;
}

const addPriority=async(data:{name:string}): Promise<Priority>=>{
    const response=await apiwithToken.post(URL,data);
    return response.data;
}
export{getPriorities,addPriority}