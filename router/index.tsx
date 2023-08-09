import React from "react";
import Layout from "../module/layout/layout";
import RouteList, {IRoute} from "./RouteList";
import {AppProps} from "next/app";
import ApiUser from "../api/ApiUser";
import Login from "../module/login";
import { useRouter } from "next/router";

export default function Routes({
  Component,
  pageProps,
  router
 
}: AppProps): JSX.Element | null {
 

  

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
      router.push("/login");
    }
    
    return null;
  };

  

  if (isPrivateRoute()) {
    if (ApiUser.isLogin()) {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
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
