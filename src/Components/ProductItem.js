import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/Actions/cartActions';
import emptyheart from '../assets/emptyheart.png';
import fullheart from '../assets/fullreadheart.png';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

function Product({ id, image, title, description, price }) {
  const { t } = useTranslation();
  const rtl = i18n.language === "ar";
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoriteProduct.favorites);
  const isFavorite = Array.isArray(favorites) ? favorites.find((fav) => fav.id === id) !== undefined : false;

  // Initialize state with local storage value or null
  const [amount, setAmount] = useState(() => {
    const storedAmount = localStorage.getItem(`amount-${id}`);
    return storedAmount ? parseInt(storedAmount) : null;
  });

  useEffect(() => {
    if (amount === null) {
      const generateRandomAmount = () => {
        const randomAmount = Math.floor(Math.random() * 10) + 1;
        setAmount(randomAmount);
        localStorage.setItem(`amount-${id}`, randomAmount);
      };
      generateRandomAmount();
    }
  }, [id, amount]);

  const handleFavoriteClick = (event) => {
    event.preventDefault(); 
    dispatch({ type: 'TOGGLE_FAVORITE', payload: { id, image, title, price } });
  };

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';

    if (isLoggedIn) {
      // Only add to cart if there's available amount
      if (amount > 0) {
        dispatch(addToCart({ id, title, price, image, quantity: 1 }));
        const newAmount = amount - 1;
        setAmount(newAmount);
        localStorage.setItem(`amount-${id}`, newAmount);
      } else {
        // Optionally show a message or handle out-of-stock condition
        console.log('No more items available to add to cart.');
      }
    } else {
      navigate("/Registration"); // Redirect to registration page if not logged in
    }
  };

  return (
    <div className={`flex flex-col justify-between bg-white rounded-lg shadow-md overflow-hidden mx-2 my-6 w-60 relative ${rtl ? 'rtl' : ''}`}>
      <Link to={`/productdetails/${id}`}>
        <img src={image} alt={title} className="w-full h-40 object-contain" />
      </Link>
      
      <Link to="#" onClick={handleFavoriteClick} className={`absolute top-2 ${rtl ? 'left-8' : 'right-8'}`}>
        {isFavorite ? (
          <img src={fullheart} width={30} height={30} className="text-red-600" />
        ) : (
          <img src={emptyheart} width={30} height={30} className="text-gray-400" />
        )}
      </Link>

      <div className="p-4 flex-grow">
        <h5 className="text-md font-bold mb-2">{t('title', { title })}</h5>
        <p className="text-red-600 text-sm mb-4">{t('onlyLeft', { amount })}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-md font-bold">{t('price', { price })}</span>
          <button
            className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded text-sm ${amount === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={handleAddToCart}
            disabled={amount === 0}
          >
            {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
