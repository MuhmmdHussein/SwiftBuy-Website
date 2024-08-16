import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from "../assets/logo.webp";
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

function NavBar() {
  const { t } = useTranslation();
  const rtl = i18n.language === "ar";
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const itemCount = useSelector(state => state.Cart.itemCount); // Get item count from Redux store

  const handleCartAction = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/cart');
    } else {
      navigate('/Registration'); // Redirect to registration if not logged in
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    localStorage.removeItem('userRole');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/Login'); // Redirect to login page after logout
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');

  // Ensure item count is correctly handled based on login status
  const displayItemCount = isLoggedIn ? itemCount : 0;

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-between sm:items-stretch">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-10 w-24" src={logo} alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block sm:flex-grow">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  aria-current="page"
                >
                  {t('Home')}
                </Link>
                <Link
                  to="/favorites"
                  className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {t('Faivorites')}
                </Link>
                {userRole === 'admin' && (
                  <Link
                    to="/Admin/:id"
                    className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {t('Admin Dashboard')}
                  </Link>
                )}
                <button
                  className="px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                  onClick={handleCartAction}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  {displayItemCount > 0 && (
                    <div className="rounded-full bg-red-500 ml-1 w-6 h-6 flex items-center justify-center text-white">
                      {displayItemCount}
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:space-x-6">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {t('logout')}
                </button>
              ) : (
                <>
                  <Link
                    to="/Registration"
                    className="text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white hidden sm:block"
                  >
                    {t('registration')}
                  </Link>
                  <Link
                    to="/Login"
                    className="text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white hidden sm:block"
                  >
                    {t('login')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="block rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              aria-current="page"
            >
              {t('Home')}
            </Link>
            <Link
              to="/favorites"
              className="block rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {t('Faivorites')}
            </Link>
            {userRole === 'admin' && (
              <Link
                to="/Admin/:id"
                className="block rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {t('Admin Dashboard')}
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/Registration"
                  className="block rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {t('registration')}
                </Link>
                <Link
                  to="/Login"
                  className="block rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {t('login')}
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {t('logout')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
