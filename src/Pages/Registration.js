import {useState} from "react";
import React from "react";

function Registration() {

     const [userData, setUserData] = useState({
        Name: "",
        uEmail: "",
        uName: "",
        uPassword: "",
        uPassword2: ""
      });
       

      const [errors, setErrors] = useState({
        nameErr: "",
        emailErr: "",
        userNameErr: "",
        passwordErr: "",
        confirmPasswordErr: ""
      });





    
     function ChangeUserData(e){

  if (e.target.name == 'Name' ) {
    

setUserData({

...userData,
Name : e.target.value

})


setErrors({
    ...errors,
    nameErr: e.target.value.trim() === "" ? "Name is required" : ""

  });


  

}else if (e.target.name == 'email') {


    setUserData({
        ...userData,
        uEmail : e.target.value
    })
    
    const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors({
        ...errors,

emailErr : !emailpattern.test(e.target.value)  ? "Please Enter a Valid Email" : ""

      })
    

} else if (e.target.name == 'password1') {

setUserData({

...userData,

uPassword1 : e.target.value

})

const passwordPatern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

setErrors ({


 passwordErr : !passwordPatern.test(e.target.value)  ? "Password must be at least 8 characters and contain an uppercase letter, a lowercase letter, and a digit " : ""

});


} else if (e.target.name == 'password2') {


    setUserData({

        ...userData,
        uPassword2 : e.target.value

    })


   setErrors({



confirmPasswordErr : e.target.value != userData.uPassword1 ?  "Passwords do not match" : ""

})


}

}
// ==========================  Password hide ===============================

      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);


      const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
      };




















  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <form>
          <div className="mb-8">
            <h3 className="text-gray-800 text-2xl font-bold">Register</h3>
          </div>


{/* ====================================  Name =============================== */}
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input
                 name="Name"
                 type="text"
                 required
                 className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                 placeholder="Enter name"
                 value={userData.Name}
                 onChange={ChangeUserData}
               />

               {errors.nameErr && <p className="text-sm text-red-600 absolute left-0 bottom-0 w-full h-0 bg-red-300">{errors.nameErr}</p>}

            


               <svg
                  xmlns="http://www.w3.org/2000/svg"


                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
            
            {/* =================================  Email =============================== */}
            
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                value={userData.uEmail}
                onChange={ChangeUserData}

                />
          {errors.emailErr && <p className="text-sm text-red-600 absolute left-0 bottom-0 w-full h-0 bg-red-300">{errors.emailErr}</p>}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
           
           {/* ========================================== Password ============================= */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password1"
                  type="password"
                  required
                  className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={userData.uPassword1}
                  onChange={ChangeUserData}
                />
                          {errors.passwordErr && <p className="text-sm text-red-600 absolute left-0 bottom-0 w-full h-0 bg-red-300 ">{errors.passwordErr}</p>}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

{/* =======================================  Confirm Password ======================================== */}

            <div>
              <label className="text-gray-800 text-sm mb-2 block mt-11 ">Confirm Password</label>
              <div className="relative flex items-center">
                <input
                  name="password2"
                  type="password"
                  required
                  className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500 mt-1 "
                  placeholder="Retype password"
                  value={userData.uPassword2}
                  onChange={ChangeUserData}

                />
             {errors.confirmPasswordErr && <p className="text-sm text-red-600 absolute left-0 bottom-0 w-full h-0 bg-red-300 ">{errors.confirmPasswordErr}</p>}


                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>









            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
              />
              <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                I accept the{" "}
                <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          <div className="!mt-8">
            <button
              type="button"
              className="w-full py-2.5 px-4 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
            >
              Create Account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;