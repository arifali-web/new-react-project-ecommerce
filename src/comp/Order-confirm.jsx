import { get, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'

import { useParams } from 'react-router-dom';

function Orderconfirm() {

    const { orderId } = useParams()

    console.log(orderId);

    const [orderconf, setorderconf] = useState([]);

    console.log(orderconf, "order - conf");

    // const Orderproducts = []

    // Orderproducts.push(orderconf);





    useEffect(() => {
        try {
            get(ref(db, `order/${auth.currentUser?.uid}/orders/${orderId}`))
                .then((snapshot) => {

                    const Order = snapshot.val();

                    console.log(Order);

                    setorderconf(Order)

                    // console.log('Order confirmation : ', snapshot.val());

                    // if (orderId === OrderId) {
                    //     setorderconf(snapshot.val().orders);
                    //     console.log('order done');
                    // }



                })
                .catch((error) => console.log(error))
        }
        catch {
            console.error('error');
        }
    }, [])

    // const productobj = orderconf?.products?.map((product) => product)

    // const productarr = productobj.map((prod) => pro) 

    // console.log(productobj, 'adadad');

    return (
        <div>
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start items-center mb-5 space-y-2 flex-col bg-green-500 ">
                    <h1 className=" flex gap-3 items-center p-4 text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-white">Our Order has been Placed <span className='bg-green-800 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </span></h1>
                </div>
                <div className="flex justify-start item-start space-y-2 flex-col ">
                    <h2 className="text-3xl lg:text-3xl font-semibold leading-7 lg:leading-9  text-gray-800">Order #{orderId}</h2>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Order History</p>

                            {orderconf?.products?.map((product, index) => (

                                <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                    <div className="pb-4 md:pb-8 w-full md:w-40">
                                        <img className="w-full hidden md:block" src={product.img} alt="dress" />
                                        <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
                                    </div>
                                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                                            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{product.name}</h3>
                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-sm leading-none text-gray-800">
                                                    <span className="text-gray-300">Style: </span> Italic Minimal Design
                                                </p>
                                                <p className="text-sm leading-none text-gray-800">
                                                    <span className="text-gray-300">Size: </span> Small
                                                </p>
                                                <p className="text-sm leading-none text-gray-800">
                                                    <span className="text-gray-300">Color: </span> {product.color}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between space-x-8 items-start w-full">

                                            <p className="text-base xl:text-lg leading-6 text-gray-800">{product.quantity}</p>
                                            <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">${product.total}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>

                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                    <p className="text-base font-semibold leading-4 text-gray-600">${orderconf.totalbill}</p>
                                </div>
                            </div>
                            {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-center space-x-4">
                                        <div class="w-8 h-8">
                                            <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                        </div>
                                        <div className="flex flex-col justify-start items-center">
                                            <p className="text-lg leading-6 font-semibold text-gray-800">
                                                DPD Delivery
                                                <br />
                                                <span className="font-normal">Delivery with 24 Hours</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-semibold leading-6 text-gray-800">$8.00</p>
                                </div>
                                <div className="w-full flex justify-center items-center">
                                    <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
                        <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                    <div className=" flex justify-start items-start flex-col space-y-2">
                                        <p className="text-base font-semibold leading-4 text-left text-gray-800">{orderconf.name}</p>
                                        <p className="text-sm leading-5 text-gray-600">10 Previous Orders</p>
                                    </div>
                                </div>

                                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <p className="cursor-pointer text-sm leading-5 text-gray-800">{orderconf.email}</p>
                                </div>
                            </div>
                            <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                                    </div>
                                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                                        <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                        <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Orderconfirm