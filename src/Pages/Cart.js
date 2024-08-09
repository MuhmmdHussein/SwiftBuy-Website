import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartActions';

const taxes = 0.14;

const Cart = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState();

  const cartItems = useSelector(state => state.items);
  const dispatch = useDispatch();

  // Handle removing an item from the cart

  
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

  // Handle updating the quantity of an item

  const handleUpdateQuantity = (id, increment) => {
    const item = cartItems.find(item => item.id === id);
    const newQuantity = item.quantity + increment;

    if (newQuantity > 0) {
        dispatch(updateQuantity(id, newQuantity));
    } else {
        handleRemoveFromCart(id);
    }
  };

  // Calculate subtotal, tax, and total
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * taxes;
  const total = subtotal + tax;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white">
                <div className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
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
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Tax (14%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-semibold mb-4">Confirm Removal</h2>
            <p className="mb-4">Are you sure you want to remove this item from your cart?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmRemove}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
              <button
                onClick={cancelRemove}
                className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
