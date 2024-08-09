import React from "react";
import Product from "../Components/ProductItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Breadcrumb from "../Components/BreadCrump";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export function Fivorites() {
  const favorites = useSelector((state) => state.favoriteProduct.favorites);
  const {t}=useTranslation();

  return (
    <>
      <Breadcrumb />
      <div className="flex flex-wrap justify-center">
      <h2 className="text-gray-900 font-bold text-2xl underline flex text-center justify-center w-full m-10">{t("like")}</h2>      
        {Array.isArray(favorites) &&
          favorites.map((favorite) => (
            <div key={favorite.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <Product
                title={favorite.title}
                id={favorite.id}
                images={[favorite.images[0].replace(/[\[\]""]/g, '')]}
                price={favorite.price}
                isFavorite={true}
              />
            </div>
          ))}
      </div>
    </>
  );
}