import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../Components/BreadCrump";

function Detailes() {
  const params = useParams();
  const [productDit, setProductDit] = useState({});

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

  return (
    <>
    < Breadcrumb />
    <div className="max-w-lg bg-white rounded-lg m-auto mt-14 shadow-md flex">
      {imageUrl && (
        <img src={imageUrl} alt="Product Image" class="w-1/2 h-1/2 pt-20 object-cover rounded-t-lg" />
      )}
      <div className="p-4">
        <h1 className="text-lg font-bold mb-1">{productDit.category?.name}</h1>
        <h2 className="text-lg font-bold mb-2">{productDit.title}</h2>
        <p className="text-gray-600 mb-4">{productDit.description}</p>
        <p className="text-lg font-bold mb-2">Price: ${productDit.price}</p>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
      </div>
    </div>
    </>
  );
}

export default Detailes;