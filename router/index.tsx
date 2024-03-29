import React, { useEffect, useState } from "react";
import Layout from "../module/layout/layout";
import RouteList, {IRoute} from "./RouteList";
import {AppProps} from "next/app";
import ApiUser from "../api/ApiUser";
import Login from "../module/login";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/UserSlice";
import { message } from "antd";
import ApiAdmin from "../api/ApiAdmin";
import Loading from "../components/loading";

export default function Routes({
  Component,
  pageProps,
  router
 
}: AppProps): JSX.Element | null {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const isPrivateRoute = (): boolean | undefined => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        if (route.isPrivate === undefined) {
          if (ApiUser.isLogin()) {
            return route.isPrivate;
          }
          return true;
        }
        return route.isPrivate;
      }
    }
    return false;
  };

  const goToLogin = (): null => {
    if (typeof window !== "undefined") {
      dispatch(logoutUser())
      message.warning('You need permission to access this page. You will be redirected to the login page!', 5);
      setTimeout(()=>{
          router.push("/login");
      }, 5000)
    }
    
    return null;
  };
  
  useEffect(()=> {
    setTimeout(()=> {
      setIsLoading(false)
    },5000)
  },[])
  if(isLoading) return <Loading />
  if (isPrivateRoute()) {
    if (ApiUser.isLogin()) {
      if(router.pathname.includes('/admin')) {
        if(ApiAdmin.getRoleAdmin() === "1") {
          return (
            <>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </>
          )
          
        } else return goToLogin()
      } else {
         return (
          <>
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </>
      );
      }
     
    }
    return goToLogin();
  } else {
    return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
  }

  
}
