import React, { useEffect, useState } from 'react';
import useCartStore from './Cartstore';
import { Button } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { get, ref } from 'firebase/database';
import { db } from '../config/firebase';

import '../App.css';

export function Products(props) {

    const [products, setProducts] = useState([]);

    // const dbproduct = []

    // dbproduct.push(products)

    console.log(products, 'product get');

    // dbproduct.map((item) => console.log(item,    "item"))

    useEffect(() => {
        try {
            get(ref(db, 'admin/products'))
                .then((snapshot) => {
                    const products = snapshot.val();

                    setProducts(Object.values(products));

                    // setProducts(products)

                    console.log(products, "Products form database");

                })

        } catch (error) {
            console.log("Error getting data: ", error);
        }
    }, [])

    // console.log(props.data);

    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = (product) => {
        addToCart(product);
        console.log(product, "added to cart");
    };

    return (
        <div className='container mx-auto px-4 flex justify-between gap-4 '>
            {
                products?.map((product, index) => {
                    return (

                        <div className='columns-3 flex items-center  mt-4'>
                            <Card key={product.productId} className="w-70">
                                <CardHeader shadow={false} floated={false} className="h-85">
                                    <img
                                        src={product.imgSrc}
                                        alt={product.imageAlt}
                                        className=" prod-img object-fill"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <div className="mb-2 flex items-center justify-between">
                                        <Typography color="blue-gray" className="font-medium">
                                            {product.name}
                                        </Typography>
                                        <Typography color="blue-gray" className="font-medium">
                                            ${product.price}
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal opacity-75"
                                    >
                                        Color : {product.color}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button
                                        ripple={false}
                                        fullWidth={true}
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                    >
                                        Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )
                })
            }

        </div>
    );
}


export default Products;