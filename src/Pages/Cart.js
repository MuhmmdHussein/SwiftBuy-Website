import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/Actions/cartActions';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const taxes = 0.14;

const Cart = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState();
  const [showAlert, setShowAlert] = useState(false); // State to show the alert
  const [showOrderConfirm, setShowOrderConfirm] = useState(false); // State to show order confirmation

  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.Cart.items) || [];
  const dispatch = useDispatch();

  // Removing an item from the cart
  const handleRemoveFromCart = (id) => {
    setItemToRemove(id);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    dispatch(removeFromCart(itemToRemove));
    setShowConfirm(false);
    setItemToRemove();
  };

  const cancelRemove = () => {
    setShowConfirm(false);
    setItemToRemove();
  };

  // Updating the quantity of an item
  const handleUpdateQuantity = (id, increment) => {
    const item = cartItems.find((item) => item.id === id);
    const currentQuantity = item.quantity;
    const availableQuantity = parseInt(localStorage.getItem(`amount-${id}`));
    const newQuantity = currentQuantity + increment;

    if (newQuantity >= 0) {
      if (availableQuantity === 0 && increment > 0) {
        setShowAlert(true); // Show the alert when trying to increment beyond the available quantity
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); // Hide the alert after 3 seconds
      } else {
        dispatch(updateQuantity(id, newQuantity));
        localStorage.setItem(`amount-${id}`, availableQuantity - increment);
      }
    } else if (newQuantity < 0) {
      handleRemoveFromCart(id);
    }
  };

  // Calculate subtotal, tax, and total
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * taxes;
  const total = subtotal + tax;

  const handleConfirmOrder = () => {
    setShowOrderConfirm(true);
    setTimeout(() => {
      setShowOrderConfirm(false);
      dispatch(clearCart()); // Clear the cart after confirmation
    }, 3000); // Hide the confirmation message after 3 seconds
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mt-10 mb-6">{t('cart')}</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 flex justify-center"> {t("empty")}</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white">
                <Link to={`/productdetails/${item.id}`}>
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="text-gray-600">Price: ${item.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </Link>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{t('order')}</h2>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {t('Confirm order')}
            </button>
          </div>
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <h2 className="text-lg font-semibold mb-4">{t('conf_delet')}</h2>
                <p className="mb-4">{t("massge")}</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={confirmRemove}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {t('remove')}
                  </button>
                  <button
                    onClick={cancelRemove}
                    className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}
          {showAlert && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-semibold">{t('out_of_stock')}</h2>
                  <svg className="w-10 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 17h.8" />
                  </svg>
                </div>
                <p className="mb-4">{t("no_more_product")}</p>
              </div>
            </div>
          )}
          {showOrderConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <h2 className="text-lg font-semibold mb-4">{t('Order Confirmed')}</h2>
                <p className="mb-4">{t('Thank You')}</p> 
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
