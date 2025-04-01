import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  //  to prevent loss of data when making page refrash after user logged in

  axios.defaults.withCredentials = true;

  //  state variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  //   get Authenticate status

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //    Get user data

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  //   logout user

  //

  useEffect(() => {
    getAuthState();
    getUserData;
  }, []);

  //   initial state values
  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
