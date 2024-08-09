import React from "react";
import Carousel from "../Components/Curosel";
import ListProduct from "./ListProduct";
import "../index.css"
import Breadcrumb from "../Components/BreadCrump";

function Home (){





    return (
        <>
        <Breadcrumb />
        <div className="w-full flex flex-col">
            <div>
                <Carousel className="carousel" />
            </div>


            <div className="flex">
                <ListProduct />
            </div>
        </div>
        </>
    )
}

export default Home;