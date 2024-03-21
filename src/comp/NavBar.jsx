import React from 'react'
import { useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import '../App.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import useCartStore from './Cartstore'
import Login from './log-in'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from '@material-tailwind/react'



const NavBar = () => {

  const { cart, removeallprodcut } = useCartStore()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigate = useNavigate();

  const [uid, setuid] = useState()

  const [user, setuser] = useState('')

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);


  console.log(uid);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        setuid(user.uid);
        setuser(user)
        // ...
        console.log("uid", uid)
        console.log('eamil', user.email)
      } else {
        // User is signed out
        // ...
        console.log("user is logged out")
      }
    });
  }, [])

  // cart btn
  const cartBtn = () => {
    if (uid) {
      navigate("/cart-page")
      console.log(uid);
    }
    else {
      setOpen(true)
    }
  }

  // log out btn
  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/sign-in");
      console.log("Signed out successfully")
      setuid()
      removeallprodcut()
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='container '>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link to='/' className="text-sm font-semibold leading-6 text-gray-900" >
              Home
            </Link>
            <Link to='/products' className="text-sm font-semibold leading-6 text-gray-900" >
              Products
            </Link>
            <Link to='#' className="text-sm font-semibold leading-6 text-gray-900">
              Marketplace
            </Link>
            <Link to='/adminpage' className="text-sm font-semibold leading-6 text-gray-900">
              Admin
            </Link>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {uid ?
              <div>

                <Link to='/' className="text-sm font-semibold leading-6 text-gray-900">
                  <button type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Log out</button>
                </Link>

              </div>
              :
              <div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <Link to='/log-in' className="text-sm font-semibold leading-6 text-gray-900">
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 ml-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Link to='/sign-up' className="text-sm font-semibold leading-6 text-white-900 ">
                    Sign Up
                  </Link>
                </button>
              </div>
            }
            {
              <div>
                <button type="button"
                  onClick={cartBtn}
                  className="inline-flex items-center rounded-md bg-indigo-600 ml-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                  View Cart{`${cart.length}`}
                </button>
              </div>
            }
            {
              <div>
                <Dialog
                 
                  open={open}
                  handler={handleOpen}
                  className="bg-transparent shadow-none w-full h-full"
                  onClose={() => setOpen(false)}
                >
                  <h1>Your Shopping Cart</h1>
                  <Card className="mx-auto w-full max-w-[24rem]">
                    <Login />
                  </Card>
                </Dialog>
              </div>
            }



          </div>
        </nav>
        {/* mobile menu */}
        {/* <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link to='/' className="text-sm font-semibold leading-6 text-gray-900" >
                    Home
                  </Link>
                  <Link to='/products' className="text-sm font-semibold leading-6 text-gray-900" >
                    Products
                  </Link>
                  <Link to='#' className="text-sm font-semibold leading-6 text-gray-900">
                    Marketplace
                  </Link>
                  <Link to='#' className="text-sm font-semibold leading-6 text-gray-900">
                    Company
                  </Link>
                </div>
                <div className="py-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <Link to='/log-in' className="text-sm font-semibold leading-6 text-gray-900">
                      Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 ml-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <Link to='/sign-up' className="text-sm font-semibold leading-6 text-white-900 ">
                      Sign Up
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog> */}
      </header>
    </div>
  )
}

export default NavBar