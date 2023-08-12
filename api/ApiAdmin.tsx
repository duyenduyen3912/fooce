import {sendGet, sendPost} from "./axios";
import config from "../config";
import store from "../redux/store";



const path = {
    getStatistical: '/DStatistical?action=',
   
};


function getRoleAdmin(): string | undefined {
  const {user} = store.getState();
  return user?.role;
}

export const getStatistical = (param: string): Promise<any> => {
    return sendGet(path.getStatistical+param);
  }


export default {
    getRoleAdmin
    
}