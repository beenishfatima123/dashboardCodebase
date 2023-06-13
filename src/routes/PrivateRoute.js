import React, { useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { USER_TYPES } from "../components/constants/global";

const PrivateRoute = ({ component: Component, module: module, ...rest }) => {
  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("logged_in"));
  }, []);

  const agentPermissionedRoute = ["Login", "Chat", "Listings", "ListingChart", "AgentCommission", "Agencies", "Auctions", "Settings"];
  const moderatorBannedRoute = ["Projects", "Settings"];


  const toRender = (type) => {
    if (type === USER_TYPES.ADMIN)
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    else if (type === USER_TYPES.MODERATOR) {
        if (!moderatorBannedRoute.includes(module)) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
      } else {
        return <Route {...rest} render={(props) => <Redirect to="/403" />} />;
      }
    } else if (type === USER_TYPES.AGENT) {
      if (agentPermissionedRoute.includes(module)) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
      } 
      else {
        return <Route {...rest} render={(props) => <Redirect to="/403" />} />;
      }
    } else {
      return <Route {...rest} render={(props) => <Redirect to="/not-permissioned" />} />;
    }
  };

  return toRender(currentUser?.user_type);
};

export default PrivateRoute;
