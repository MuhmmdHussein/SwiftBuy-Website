import React from 'react';
import test from "../assets/logo.webp"
import { Link } from 'react-router-dom';
import emptyheart from '../assets/emptyheart.png'
import fullheart from "../assets/fullreadheart.png"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/Actions/Action';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

function Product({ id, images, title, description, price }) {
  const {t} =useTranslation();
  const rtl = i18n.language == "ar";
  
  const imageUrl = images[0].replace(/[\[\]""]/g, '');
  const amount = Math.floor(Math.random() * 10) + 1;

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoriteProduct.favorites, []);
  const isFavorite = Array.isArray(favorites)? favorites.find((fav) => fav.id === id)!== undefined : false;  

  const handleFavoriteClick = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: { id, images, title, price } });
  };

  return (
    <Link className='link' to={`/productdetails/${id}`} >
      <div
        className={`max-w-sm h-96 flex-col justify-between bg-white rounded-lg shadow-md overflow-hidden mx-3 my-6 w-72 relative ${rtl ? 'rtl' : ''}`}
      >
        <Link to="#" onClick={handleFavoriteClick} className={`absolute top-2 ${rtl ? 'left-8' : 'right-8'}`}>
          {isFavorite ? (
            <img src={fullheart} width={35} height={35} className=" text-red-600" />
          ) : (
            <img src={emptyheart} width={35} height={35} className=" text-gray-400" />
          )}
        </Link>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-1/2 object-cover"
        />
        <div className="p-4">
        <h5 className="text-lg h-1/4 font-bold mb-2">{t('title', { title })}</h5>
        <p className="text-red-600 h-1/10 text-md mb-4">{t('onlyLeft', { amount })}</p>
        <div className="flex justify-between mb-4">
          <span className="text-lg font-bold">{t('price', { price })}</span>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            {t('addToCart')}
          </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;