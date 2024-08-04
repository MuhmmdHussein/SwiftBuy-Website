import React from 'react';
import test from "../assets/logo.webp"
import { Link } from 'react-router-dom';


function Product({ id ,images, title, description, price }) {
    const imageUrl = images[0].replace(/[\[\]""]/g, '');
    const amount = Math.floor(Math.random() * 10) + 1;
    return (
        <Link className='link' to={`/productdetails/${id}`} >
        <div
          className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden mx-3 my-3 w-72 "
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h5 className="text-lg font-bold mb-2">{title}</h5>
            <p className="text-red-600 text-md mb-4">only {amount} left on store</p>
            <div className="flex justify-between mb-4">
              <span className="text-lg font-bold">${price}</span>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        </Link>
      );
};

export default Product;