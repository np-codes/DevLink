import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Sign_In_API, Sign_Up_API } from '../apis/authAPIS';


const AuthPage = ({section}) => {
  const inputcss =
    "p-2 sm:p-3 md:p-4 m-3 w-9/12 rounded-md text-black font-bold text-lg bg-gray-300 placeholder-black placeholder-opacity-70 transition-all duration-300 ease-in-out hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none focus:bg-gradient-to-br from-purple-200 via-blue-200 to-green-200";

  const buttoncss =
    "p-1 sm:p-1.5 m-3 w-6/12 max-w-lg bg-gray-300 text-black font-semibold text-xl rounded-md transition-all duration-500 hover:scale-105 hover:ring-2 hover:ring-green-500 hover:ring-opacity-50 hover:bg-gradient-to-br from-purple-200 via-blue-200 to-green-200";

  const cardcss =
    "card card-border sm:max-w-lg mx-auto rounded-2xl bg-base-100 w-[80%] justify-self-center transition-all duration-500 hover:shadow-xl shadow-black hover:ring-2 hover:ring-green-500 hover:ring-opacity-10 focus-within:scale-105 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-opacity-50";

  const [ emailId, setEmailId ] = useState("");
  const [ password, setPassword ] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleClick = async() => {
    if (section === "Sign Up") {
      const signupInfo = { firstName, lastName, emailId, password };
      Sign_Up_API({signupInfo, dispatch, navigate, setErrorMessage})
    } else {
      const signinInfo = { emailId, password };
      Sign_In_API({signinInfo , dispatch , navigate, setErrorMessage})
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-7.78rem)] bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 px-4 sm:px-8">
      <div className={cardcss}>
        <h2 className="p-2 my-3 text-gray-300 text-3xl sm:text-5xl font-bold text-center">
          {section}
        </h2>
        <div className="flex flex-col items-center px-2 sm:px-6">
          {section === "Sign Up" && (
            <div className="w-full flex flex-col items-center sm:flex-row sm:gap-4 sm:justify-center">
              <input
                type="text"
                value={firstName}
                className={inputcss + " w-[90%] sm:w-1/2"}
                placeholder="First Name"
                onChange={(e) => setfirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                className={inputcss + " w-[90%] sm:w-1/2"}
                placeholder="Last Name"
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
          )}
          <input
            type="email"
            value={emailId}
            className={inputcss + " w-[90%] max-w-md"}
            placeholder="Email"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="password"
            value={password}
            className={inputcss + " w-[90%] max-w-md"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500 mt-1 text-center w-full max-w-lg">
            {errorMessage}
          </p>
          <button className={buttoncss} onClick={handleClick}>
            {section}
          </button>
          <h2 className="mb-8 p-1 text-gray-300 text-center text-base sm:text-lg max-w-lg">
            {section === "Sign In" ? (
              <>
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-300 hover:underline transition duration-200"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-blue-300 hover:underline transition duration-200"
                >
                  Sign in
                </Link>
              </>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;