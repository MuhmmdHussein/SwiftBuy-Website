import React from "react";
import Carousel from "../Components/Curosel";
import ListProduct from "./ListProduct";

function Home (){





    return (
        <div className="w-full flex flex-col">
            <div>
                <Carousel />
            </div>


            <div className="flex">
                <ListProduct />
            </div>
        </div>
    )
}

export default Home;