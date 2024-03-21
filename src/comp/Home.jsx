import React from "react";
import Products from "./Products";

import { Mensclothes, WomensClothes, KidsClothes } from '../data'


function HomePage() {



    return (
        <div>
            <div className="container mx-auto px-4">
                <Products data={Mensclothes} />
                <Products data={WomensClothes} />
                <Products data={KidsClothes} />
                <Products />
            </div>
        </div>
    )
}

export default HomePage;