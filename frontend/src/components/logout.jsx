import { useContext, useEffect } from "react";
import { GlobalState } from "./common/globalState";
import usersService from "../services/usersService";
import config from "../config.json";

const LogOut = () => {
  const state = useContext(GlobalState);
  const [user] = state.usersApi.user;
  const [socialMediaUser] = state.usersApi.socialMediaUser;

  useEffect(() => {
    if (user) {
      usersService.logout();
      window.location = "/";
    }

    if (socialMediaUser) {
      window.open(`${config.apiUrl}/auth/logout-social-media`, "_self");
    }
  }, [user, socialMediaUser]);

  return null;
};

export default LogOut;
