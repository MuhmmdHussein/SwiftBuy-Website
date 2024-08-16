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

  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (productDit.id) {
      const storedAmount = localStorage.getItem(`amount-${productDit.id}`);
      setAmount(storedAmount ? parseInt(storedAmount) : null);
    }
  }, [productDit.id]);

  

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${params.id}`)
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
        image:productDit.image, 
        quantity: 1 
      }));
      console.log(amount)
      const newAmount = amount - 1;
      setAmount(newAmount);
      localStorage.setItem(`amount-${productDit.id}`, newAmount);
    } else {
      navigate("/Registration");
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="max-w-lg bg-white rounded-lg m-auto mt-14 h-96 shadow-lg flex items-center">
      
          <img 
            src={productDit.image} 
            alt="Product Image" 
            className="w-1/2 justify-center items-center h-1/2  object-cover rounded-t-lg" 
          />
        <div className="p-4">
          <h1 className="text-lg font-bold mb-1">{productDit.category}</h1>
          <h2 className="text-lg font-bold mb-2">{productDit.title}</h2>
          <p className="text-gray-600 mb-4">{productDit.description}</p>
          <p className="text-lg font-bold mb-2">Price: ${productDit.price}</p>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddToCart}
            disabled={amount === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Detailes;
