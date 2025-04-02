import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState(0);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
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

  //  sending otp to an email

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });

      if (data.success) {
        alert(data.message);
        setIsEmailSent(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //  submit the received OTP

  const submitOtp = async (e) => {
    e.preventDefault();

    const otpArray = inputRef.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  //

  const submitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", { email, otp, newPassword });

      if (data.success) {
        alert(data.success);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Forogt your password?</h2>
        <p className="text-gray-500  text-md">
          No wories we will send you reset instructions.
          <br />
          Enter the email address you used to register with
        </p>
        <div className="py-4 max-w-2xl">
          {/* enter email */}
          {!isEmailSent && (
            <form className="w-full" method="POST" onSubmit={onSubmitEmail}>
              <input
                type="email"
                className="w-full text-sm font-gray-200 focus:outline-none border border-gray-300 rounded-lg px-2 py-2.5"
                placeholder="company@domain.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="rounded-full bg-blue-600 px-2 py-2.5 w-full text-white mt-3 cursor-pointer">Submit Now</button>
            </form>
          )}

          {/* OTP input form */}
          {!isOtpSubmitted && isEmailSent && (
            <form className="w-[400px] p-4" onSubmit={submitOtp} method="POST">
              <div className="mb-5">
                <h2 for="otp" className="text-xl font-semibold text-gray-700 mb-3">
                  Enter Reset Password OTP
                </h2>

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
          )}
          {/* New Password form */}
          {isOtpSubmitted && isEmailSent && (
            <div>
              <form className="w-full" method="POST" onSubmit={submitNewPassword}>
                <input
                  type="password"
                  className="w-full text-sm font-gray-200 focus:outline-none border border-gray-300 rounded-lg px-2 py-2.5"
                  placeholder="*********"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className="rounded-full bg-blue-600 px-2 py-2.5 w-full text-white mt-3 cursor-pointer">Submit Now</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
