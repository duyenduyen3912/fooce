import React from "react";
import Layout from "../module/layout/layout";
import RouteList, {IRoute} from "./RouteList";
import Config from "../config";
import {AppProps} from "next/app";
import LoginComponent from "../pages/login";
import ApiUser from "../api/ApiUser";

export default function Routes({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element | null {
  const login = !ApiUser.isLogin();

  const isRoute = (key: keyof IRoute): boolean => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        return !!route[key];
      }
    }
    return false;
  };

  // const isRouteRequireRole = (): boolean => {
  //   for (const route of RouteList) {
  //     if (router.pathname === route.path) {
  //       return !!route.role;
  //     }
  //   }
  //   return false;
  // };
  //
  // const isUserRoleAuthorized = (): boolean => {
  //   const userRole = ApiUser.getUserRole();
  //   if (userRole) {
  //     for (const route of RouteList) {
  //       if (router.pathname === route.path) {
  //         return !!route.role?.includes(userRole);
  //       }
  //     }
  //   }
  //   return false;
  // };

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
    router.push(Config.PATHNAME.LOGIN);
    return null;
  };

  if (typeof window === "undefined") {
    return null;
  }

  if (login) {
    return <LoginComponent />;
  }

  if (isRoute("isAuth")) {
    return goToLogin();
  }

  if (isPrivateRoute()) {
    if (ApiUser.isLogin()) {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
    return goToLogin();
  }

  // if (ApiUser.isLogin()) {
  //   return (
  //     <Layout>
  //       <Component {...pageProps} />
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
