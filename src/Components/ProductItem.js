import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartActions';

function Product({ id, images, title, description, price }) {
  const dispatch = useDispatch();
  const imageUrl = images[0].replace(/[\[\]""]/g, '');
  const amount = Math.floor(Math.random() * 10) + 1;

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, imageUrl, quantity: 1 }));
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden mx-3 my-3 w-72">
      <Link className='link' to={`/productdetails/${id}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h5 className="text-lg font-bold mb-2">{title}</h5>
        <p className="text-red-600 text-md mb-4">only {amount} left on store</p>
        <div className="flex justify-between mb-4">
          <span className="text-lg font-bold">${price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
