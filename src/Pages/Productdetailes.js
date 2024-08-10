import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../Components/BreadCrump";
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/Actions/cartActions';

function Detailes() {
  const params = useParams();
  const [productDit, setProductDit] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://api.escuelajs.co/api/v1/products/${params.id}`)
      .then((res) => {
        setProductDit(res.data);
      })
      .catch((error) => console.error(error));
  }, [params.id]);

  let imageUrl = "";
  if (productDit.images) {
    imageUrl = productDit.images[0].replace(/[\[\]""]/g, '');
  }

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      dispatch(addToCart({ 
        id: productDit.id, 
        title: productDit.title, 
        price: productDit.price, 
        imageUrl, 
        quantity: 1 
      }));
    } else {
      navigate("/Registration");
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="max-w-lg bg-white rounded-lg m-auto mt-14 shadow-md flex">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Product Image" 
            className="w-1/2 h-1/2 pt-20 object-cover rounded-t-lg" 
          />
        )}
        <div className="p-4">
          <h1 className="text-lg font-bold mb-1">{productDit.category?.name}</h1>
          <h2 className="text-lg font-bold mb-2">{productDit.title}</h2>
          <p className="text-gray-600 mb-4">{productDit.description}</p>
          <p className="text-lg font-bold mb-2">Price: ${productDit.price}</p>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Detailes;
