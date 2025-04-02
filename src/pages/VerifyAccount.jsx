import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { backendUrl, getUserData, userData } = useContext(AppContext);

  const inputRef = useRef([]);

  // handling input value in the input boxes
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  // handle delete value with backspace with key down

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  // handle past functionality

  const handlePaste = (e) => {
    // get data from copied clipboard
    const paste = e.clipboardData.getData("text");
    // split the copied data
    const pasteArray = paste.split("");
    // paste all number in each input fill

    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  // handle verify sent OTP
  const onhandleVerify = async (e) => {
    try {
      e.preventDefault();

      const otpArray = inputRef.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(backendUrl + "/api/auth/verify-account", { otp });

      if (data.success) {
        alert(data.message);
        getUserData();
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // navigate user to the home page if the account is verified

  useEffect(() => {
    userData && userData.isAccountVerified && navigate("/");
  }, [userData]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form className="w-[400px] p-4" onSubmit={onhandleVerify}>
        <div className="mb-5">
          <label for="otp" className="block mb-8 text-lg font-medium text-gray-900 ">
            Enter 6 digit OTP code sent your email
          </label>

          <div className="flex justify-between" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength={1}
                  key={index}
                  name="otp"
                  ref={(e) => (inputRef.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg p-2 text-center"
                  required
                />
              ))}
          </div>
        </div>

        <button type="submit" className="cursor-pointer text-white bg-blue-600 w-full rounded-full px-3 py-2">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
