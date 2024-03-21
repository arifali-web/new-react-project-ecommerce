import React, { useEffect, useState } from 'react';
import useCartStore from './Cartstore';
import { FaTrashAlt } from 'react-icons/fa';
import '../App.css'
import { auth, db } from '../config/firebase';
import { get, push, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';



const CartPage = () => {

    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, total, removeallprodcut } = useCartStore();

    // const [productName,setproductname] = useState()

     console.log(cart,'cart');

    const navigate = useNavigate()

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')

    const [orderId, setOrderId] = useState();

    useEffect(() => {
        try {
            get(ref(db, `users/${auth.currentUser?.uid}`))
                .then((snapshot) => {
                    console.log(snapshot.val());
                    setName(snapshot.val().name)
                    setEmail(snapshot.val().email)

                })
                .catch((error) => {
                    console.log('error');
                })
        }
        catch {
            console.log("error");
        }
    }, [])

    const submitproduct = (e) => {
        e.preventDefault();
        try {

            const productsData = cart.map(product => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                total: product.price * product.quantity,
                color: product.color,
                img: product.imgSrc
            }));



            const userOrdersRef = ref(db, `order/${auth.currentUser?.uid}/orders`);

            const newOrderRef = push(userOrdersRef);

            console.log(newOrderRef);


            set(newOrderRef, {
                orderid: newOrderRef.key,
                products: productsData,
                name: name,
                email: email,
                totalbill: total,
                date: new Date().toDateString()
            });

            setOrderId(newOrderRef.key);



            // set(ref(db, `order/${auth.currentUser?.uid}/orders`), {
            //     product: productsData,
            //     name: name,
            //     email: email,
            //     totalbill: total
            // })

            navigate(`/order-page/${newOrderRef.key}`)
            removeallprodcut()
        }
        catch {
            console.log("error");
        }
        console.log(auth.uid);
    }

    return (
        <div className='container mx-auto px-4'>
            <div className="hidden h-[200px] w-full max-w-[800px] columns-7  gap-3 px-5 pb-10 md:grid">
                <table className="table-fixed">
                    <thead className="h-16 bg-neutral-100">
                        <tr>
                            <th>ITEM</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th>TOTAL</th>
                            {/* <th>{name}</th>
                            <th>{email}</th>
                            <th>{orderId}</th> */}
                        </tr>
                    </thead>
                    <tbody className="">
                        {cart?.map((product, index) => {
                            return (
                                <tr className="h-[200px] border-b" key={index}>
                                    <td className="align-middle">
                                        {/* Render product details from the prop */}
                                        <div className="flex">
                                            <img
                                                className="w-[90px]"
                                                src={product.imgSrc}
                                                alt="bedroom image"
                                            />
                                            <div className="ml-3 flex flex-col justify-center">
                                                <p className="text-xl font-bold">{product.name}</p>
                                                <p className="text-sm text-gray-400">color: {product.color}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="mx-auto text-center">${product.price}</td>
                                    {/* Additional code for quantity and total remains unchanged */}
                                    <td className="align-middle">
                                        <div className="flex items-center justify-center">
                                            <button
                                                className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                                onClick={() =>
                                                    decreaseQuantity(product.id)
                                                }
                                            >
                                                -
                                            </button>
                                            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                                {product.quantity}
                                            </div>
                                            <button
                                                className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                                onClick={() =>
                                                    increaseQuantity(product.id)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="mx-auto text-center">total: ${product.price * product.quantity}</td>
                                    <td className="align-middle">
                                        <FaTrashAlt
                                            onClick={() => removeFromCart(product.id)}
                                            className="m-0 h-5 w-5 cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='box'>
                <section className=" w-full px-4 md:max-w-[400px]">
                    <div className="">
                        <div className="border py-5 px-4 shadow-md">
                            <p className="font-bold">ORDER SUMMARY</p>
                            <div className="flex justify-between border-b py-5">
                                <p>Subtotal</p>
                                <p>${total.toFixed(2)}</p> {/* Display updated subtotal */}
                            </div>
                            <div className="flex justify-between border-b py-5">
                                <p>Shipping</p>
                                <p>Free</p>
                            </div>
                            <div className="flex justify-between py-5">
                                <p>Total</p>
                                <p>${total.toFixed(2)}</p> {/* Display updated subtotal */}
                            </div>
                            <a href="checkout-address.html">
                                <button onClick={submitproduct} className="w-full bg-violet-900 px-5 py-2 text-black  rounded-md">
                                    Proceed to checkout
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div >
    );
};

export default CartPage;