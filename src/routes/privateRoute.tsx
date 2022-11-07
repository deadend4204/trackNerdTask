import * as React from "react";
import { RouteProps, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type PrivateRouteType = {
  Component: React.ElementType;
  isDashboard: boolean;
  isPrivate: boolean;
  isVisibleAfterLogin: boolean;
} & RouteProps;

export const PrivateRoute: React.FC<PrivateRouteType> = ({
  Component,
  isDashboard,
  isVisibleAfterLogin,
  isPrivate,
  ...rest
}) => {
  const { user, isAppLoading } = useAuth();

  // if (isAppLoading || !Component) {
  //   return <div>Loading...</div>;
  // }

  if (!user && isPrivate) {
    return <Navigate to={"/login"} replace />;
  }
  if (user && !isPrivate && !isVisibleAfterLogin) {
    return <Navigate to={"/"} replace />;
  }
  if (isDashboard) {
    return (
      <div>
        <div>
          <Component {...rest} />
        </div>
      </div>
    );
  }

  return <Component {...rest} />;
};
