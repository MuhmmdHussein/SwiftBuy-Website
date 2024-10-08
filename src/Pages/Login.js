import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); 

  const [userData, setUserData] = useState({
    uEmail: "",
    uPassword: ""
  });

  const [errors, setErrors] = useState({
    emailErr: "",
    passErr: ""
  });

  const ChangeUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });

    switch (e.target.name) {
      case "uEmail":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors({
          ...errors,
          emailErr: !emailPattern.test(e.target.value) ? "Please write a valid email" : ""
        });
        break;
      case "uPassword":
        setErrors({
          ...errors,
          passErr: e.target.value.length < 6 ? "Password must be at least 6 characters long" : ""
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!userData.uEmail || !userData.uPassword) {
      setErrors({
        emailErr: userData.uEmail ? errors.emailErr : "Email is required",
        passErr: userData.uPassword ? errors.passErr : "Password is required"
      });
      return;
    }

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (storedEmail === userData.uEmail && storedPassword === userData.uPassword) {
      setErrors({
        emailErr: "",
        passErr: ""
      });

      // Check if the person is an admin or user
      if ((userData.uEmail === 'admin1@swifbuy.com' || userData.uEmail === 'admin2@swifbuy.com') && userData.uPassword === 'Admin@111') {
        localStorage.setItem('userRole', 'admin');
      } else {
        localStorage.setItem('userRole', 'user');
      }
      // Navigate to Admin page if userRole is admin
      if (localStorage.getItem('userRole') === 'admin') {
        navigate("/Admin/:id");
      } else {
        navigate("/");
      }

      // Store login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setErrors({
        emailErr: "Invalid email or password",
        passErr: ""
      });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="uEmail"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={userData.uEmail}
                  onChange={ChangeUserData}
                />
                {errors.emailErr && <p className="text-sm text-red-600">{errors.emailErr}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="uPassword"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={userData.uPassword}
                  onChange={ChangeUserData}
                />
                {errors.passErr && <p className="text-sm text-red-600">{errors.passErr}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                  </div>
                  <div className="ml-3 text-sm">
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link to="/Registration" className="font-medium text-primary-600 hover:underline dark:text-primary-900">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
