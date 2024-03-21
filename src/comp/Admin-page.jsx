import { get, push, ref, remove, set, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


function Adminpage() {

    const [displayProducts, setdisplayProducts] = useState();

    const [prodName, setProdName] = useState("");  //product name state

    const [prodimg, setProdImg] = useState(null);   //image file input

    const [prodColor, setProdColor] = useState('');     //color of product

    const [prodPrice, setProdPrice] = useState('');      //price of the product

    const [productId, setproductId] = useState('')

    const [selectedproduct, setSelectedProduct] = useState();             //selected product to edit or delete


    // edit  product data
    const handleEdit = (productData) => {

        setProdName(productData.name);
        setProdColor(productData.color);
        setProdPrice(productData.price);
        setproductId(productData.id);
        setSelectedProduct(productData);

    };

    // console.log(selectedproduct, "selected id");

    // console.log(productId, 'id');

    // console.log(prodimg);

    // delete  a specific product
   
    const handleDelete = (productId) => {
        try {
            const prodRef = ref(db, `admin/products/${productId}`);
            remove(prodRef);

            setdisplayProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
        } catch (error) {
            console.log("Error deleting product", error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProdImg(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        try {


            if (selectedproduct) {

                const productRef = ref(db, `admin/products/${productId}`);

                set(productRef, {
                    id: productId,
                    imgSrc: selectedproduct.imgSrc,
                    name: prodName,
                    color: prodColor,
                    price: prodPrice
                });

                setdisplayProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === productId ? {
                            ...product,
                            name: prodName,
                            color: prodColor,
                            price: prodPrice,
                        } : product
                    )
                );
            }
            else {

                const product = ref(db, 'admin/products')

                const addproduct = push(product);

                set(addproduct, {
                    id: addproduct.key,
                    imgSrc: prodimg,
                    name: prodName,
                    color: prodColor,
                    price: prodPrice
                })

                setdisplayProducts((prevProducts) => [...prevProducts, {
                    id: addproduct.key,
                    imgSrc: prodimg,
                    name: prodName,
                    color: prodColor,
                    price: prodPrice,
                }]);
            }

            setProdName('')
            setProdColor('')
            setProdPrice('')
            setProdImg('')
            setSelectedProduct('')
        }
        catch {
            console.log("Error")
        }

    }

    // displaing products



    console.log(displayProducts, 'display product');

    useEffect(() => {

        try {
            get(ref(db, "admin/products"))
                .then((snapshot) => {
                    const getproduct = snapshot.val()

                    console.log(getproduct);
                    setdisplayProducts(Object.values(getproduct))
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        catch {
            console.error('error');
        }

    }, [])


    return (
        <div className='container mx-auto px-4'>
            <h1>Admin Page</h1>
            <div>
                <div className="mt-4">
                    {selectedproduct ?

                        <img className='w-40 h-40 object-fill' src={selectedproduct.imgSrc} />

                        :

                        <div>
                            <label
                                htmlFor="text"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Product Image
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="file"
                                    name="img"
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    className="block w-100 mt-1 border-gray-000 rounded-md shadow-sm focus:border-indigo-300 "
                                />
                            </div>
                        </div>}
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Product Name
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="text"
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            className="block w-100 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Product Color
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="color"
                            value={prodColor}
                            onChange={(e) => setProdColor(e.target.value)}
                            className="block w-100 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="text"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Product Price
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="number"
                                name="price"
                                value={prodPrice}
                                onChange={(e) => setProdPrice(e.target.value)}
                                className="block w-100 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
                        >
                            {selectedproduct ? 'Update Product' : 'Add Product'}

                        </button>
                    </div>
                </div>
            </div>
            <div className='container mx-auto px-4 flex justify-between gap-4'>
                {/* Display the list of products */}
                <div className='grid grid-cols-4 gap-4'>
                    {
                        displayProducts?.map((product, index) => {
                            return (
                                <div className='flex items-center  mt-4'>
                                    <Card key={product.id} className="w-70">
                                        <h2>{product.id}</h2>
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
                                                onClick={() => handleEdit(product)}
                                                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                ripple={false}
                                                fullWidth={true}
                                                onClick={() => handleDelete(product.id)}
                                                className="mt-4 bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                            >
                                                Delete
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Adminpage