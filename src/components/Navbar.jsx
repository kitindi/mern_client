import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);

  // send verification OTP

  const sendEmailVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
      if (data.success) {
        alert(data.message);
        navigate("/email-verify");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // logout the user
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dev Mates </span>
          </Link>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div>
              {userData ? (
                <div className="flex items-center space-x-2">
                  <div className="relative group">
                    <p className="w-8 h-8 rounded-full flex items-center justify-center bg-white font-semibold cursor-pointer">
                      {userData.name[0].toUpperCase()}
                    </p>

                    <div className="w-48 absolute top-8 z-10 right-0  p-1 bg-white hidden group-hover:block">
                      <ul className="text-gray-700 flex flex-col gap-2 p-2">
                        {!userData.isAccountverified && (
                          <li onClick={sendEmailVerificationOtp} className="cursor-pointer p-1 hover:bg-gray-300">
                            Verify Account
                          </li>
                        )}
                        <li className="cursor-pointer p-1 hover:bg-gray-300" onClick={logout}>
                          Log out
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <p className="text-white">Hey, Developer</p>
                  <Link
                    to="/login"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
