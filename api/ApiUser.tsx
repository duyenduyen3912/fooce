import {sendGet} from "./axios";
import config from "../config";


export interface ILoginBody{
    email: string;
    password: string;
}

export interface IUserLogin {
    id?: number;
    username: string;
    phone: string;
    email: string;
    passwword: string;
    
}

const path = {
    login: "/login",
    getUserInfor: "/getUserInfor"
  };

function getUserInfor(params:any): Promise<IUserLogin> {
    return sendGet(path.getUserInfor + '/' + params.id, params )
}