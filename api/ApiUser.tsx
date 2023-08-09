import {sendGet, sendPost} from "./axios";
import config from "../config";
import store from "../redux/store";
import { IUserLogin, ILoginBody, IAccountInfo, ILoginUser } from "../type";
import axios from "axios";


const path = {
    login: "/API/API.php",
    getUserInfor: "/getUserInfor"

};

function isLogin(): boolean {
  return !!getAuthToken();
}

function getAuthToken(): string | undefined {
  const {user} = store.getState();
  return user?.accessToken;
}

function getUserInfor(params:any): Promise<IUserLogin> {
    return sendGet(path.getUserInfor + '/' + params.id, params )
}

function login(body: ILoginBody): Promise<ILoginUser> {
    return sendPost(path.login,body);
  }



export default {
    getUserInfor,
    isLogin,
    getAuthToken,
    login,
}