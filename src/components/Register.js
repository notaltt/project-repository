import myImage from '../images/logo.png';
import React from "react";
import DarkMode from './DarkMode';
import { useState } from "react";
import { db } from "./firebase";
import FilterableSelect from "./FilterableSelect";



const options = [
  "",
  "Cebu Institute of Technology - University",
  "Hardvard University",
  "Cambridge University",
  "SpaceX",
  "Microsoft",
  "Apple",
];

export default function register() {
  // const [input, setInput] = useState("");

  return (
    <>

      {/* const inputHandler = (e) =>{
        setInput(e.target.value);
      } */}
      
      <div className="flex relative flex-1 h-screen dark:bg-gray-900 bg-white flex-col px-6 py-12 lg:px-8">
           <div className='absolute right-5 top-5'>
           <DarkMode/> 
           </div>
                      
        <div className='mt-10'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={myImage}
            alt="Privo Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto dark:bg-gray-900 sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="flex text-sm font-medium leading-6 dark:text-white text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  placeholder="Email@something.com"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div >
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="firstName lastName"
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div >
              <div className="flex items-center justify-between">
                <label htmlFor="username" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Username"
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div >
              <div className="flex items-center justify-between">
                <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Phone Number
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Phone number"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  pattern="[0-9]{3}"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div >
              <div className="flex items-center justify-between">
                <label htmlFor="team" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Team
                </label>
              </div>
              <div className="mt-2">              
              <FilterableSelect options={options} />
              </div>
            </div>

            <div >
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                href="/login"
                // type="submit"
                className="flex w-full justify-center rounded-md dark:bg-purple-500 bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Register
              </button>
              <a href="/login" className="font-semibold leading-6 dark:text-purple-400 text-blue-600 hover:text-blue-500">
              back to login page
            </a>
            </div>
          </form>

        </div>
        </div>
        
      </div>
      
    </>
  )
}
  