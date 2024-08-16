import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Registration() {
  const navigate = useNavigate(); 

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    uEmail: "",
    uPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    passErr: "",
    confirmPassErr: ""
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Validation logic
    switch (name) {
      case "firstName":
        const firstNamePattern = /^[A-Za-z\s'-]+$/;
        setErrors(prevErrors => ({
          ...prevErrors,
          firstNameErr: !firstNamePattern.test(value) || value.trim() === "" ? "Invalid first name" : ""
        }));
        break;
      case "lastName":
        const lastNamePattern = /^[A-Za-z\s'-]+$/;
        setErrors(prevErrors => ({
          ...prevErrors,
          lastNameErr: !lastNamePattern.test(value) || value.trim() === "" ? "Invalid last name" : ""
        }));
        break;
      case "uEmail":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors(prevErrors => ({
          ...prevErrors,
          emailErr: !emailPattern.test(value) ? "Please write a valid email" : ""
        }));
        break;
      case "uPassword":
        setErrors(prevErrors => ({
          ...prevErrors,
          passErr: value.length < 6 ? "Password must be at least 6 characters long" : ""
        }));
        break;
      case "confirmPassword":
        setErrors(prevErrors => ({
          ...prevErrors,
          confirmPassErr: value !== userData.uPassword ? "Passwords do not match" : ""
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!userData.firstName || !userData.lastName || !userData.uEmail || !userData.uPassword || !userData.confirmPassword) {
      setErrors(prevErrors => ({
        firstNameErr: userData.firstName ? prevErrors.firstNameErr : "First name is required",
        lastNameErr: userData.lastName ? prevErrors.lastNameErr : "Last name is required",
        emailErr: userData.uEmail ? prevErrors.emailErr : "Email is required",
        passErr: userData.uPassword ? prevErrors.passErr : "Password is required",
        confirmPassErr: userData.confirmPassword ? prevErrors.confirmPassErr : "Confirm Password is required"
      }));
      return;
    }

    // Save user data to localStorage (or handle registration logic)
    localStorage.setItem('userEmail', userData.uEmail);
    localStorage.setItem('userPassword', userData.uPassword);

    // Navigate to the login page or any other page
    navigate("/login");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register a new account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                  value={userData.firstName}
                  onChange={handleChange}
                />
                {errors.firstNameErr && <p className="text-sm text-red-600">{errors.firstNameErr}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                  value={userData.lastName}
                  onChange={handleChange}
                />
                {errors.lastNameErr && <p className="text-sm text-red-600">{errors.lastNameErr}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="uEmail"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={userData.uEmail}
                  onChange={handleChange}
                />
                {errors.emailErr && <p className="text-sm text-red-600">{errors.emailErr}</p>}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="uPassword"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  required
                  value={userData.uPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {passwordVisible ? <AiFillEyeInvisible className="text-gray-500 mt-6" /> : <AiFillEye className="text-gray-500 mt-6" />}
                </button>
                {errors.passErr && <p className="text-sm text-red-600">{errors.passErr}</p>}
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                  required
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {confirmPasswordVisible ? <AiFillEyeInvisible className="text-gray-500 mt-6" /> : <AiFillEye className="text-gray-500 mt-6" />}
                </button>
                {errors.confirmPassErr && <p className="text-sm text-red-600">{errors.confirmPassErr}</p>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
