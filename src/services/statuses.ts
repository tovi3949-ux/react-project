import type { Status } from "../types/status";
import { apiwithToken } from "./http";
import { BASE_URL } from "./URL";

const URL=BASE_URL+'/statuses';

const getStatuses=async(): Promise<Status[]>=>{
    const response=await apiwithToken.get(URL);
    return response.data;
}

const addStatus=async(data:{name:string}): Promise<Status>=>{
    const response=await apiwithToken.post(URL,data);
    return response.data;
}
export{getStatuses,addStatus}