import myImage from '../images/logo.png';
import React from "react";
import DarkMode from './DarkMode';
import { useState } from 'react';
import { firestore as db } from "./firebase";
import FilterableSelect from "./FilterableSelect";
import { addDoc, collection } from 'firebase/firestore';




  export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [team, setTeam] = useState("CIT-U");

    const handleTeamChange = (selectedTeam) => {
      setTeam(selectedTeam);
    };
  

    const options = [
      "",
      "Cebu Institute of Technology - University",
      "Hardvard University",
      "Cambridge University",
      "SpaceX",
      "Microsoft",
      "Apple",
    ];
    
    const inputHandler = (e) => {
      const { name, value } = e.target;

      switch(name) {
          case "email":
              setEmail(value);
              break;
          case "name":
              setName(value);
              break;
          case "password":
              setPassword(value);
              break;
          case "phoneNumber":
              setPhone(value);
              break;
          case "username":
              setUsername(value);
              break;
          // Add other cases as needed
          default:
              break;
      }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
        avatar: "null",
        email: email,
        name: name,
        password: password,
        phone: phone,
        role: "member",
        team: team,
        username: username,
    };

    try {
        await addDoc(collection(db, "user"), userData);
        // Clear form or navigate to another page or show success message
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
        // Handle error, e.g., show error message to user
    }
  };



  return (
    <>
      
      <form onSubmit={submitHandler}>
      <div className="flex relative flex-1 h-screen dark:bg-gray-900 bg-white flex-col px-6 py-12 lg:px-8">
           <div className='absolute right-5 top-5'>
           <DarkMode/> 
           </div>
                      
        <div className='mt-5'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={myImage}
            alt="Privo Logo"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto dark:bg-gray-900 sm:w-full sm:max-w-sm">
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
                  onChange={inputHandler}
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
                  onChange={inputHandler}
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
                  onChange={inputHandler}
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
                  pattern="[0-9]{11}"
                  onChange={inputHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div >
              <div className="flex items-center justify-between">
                <label htmlFor="Company" className="block text-sm font-medium leading-6 dark:text-white text-gray-900">
                  Company
                </label>
              </div>
              <div className="mt-2">              
              <FilterableSelect options={options} onTeamChange={handleTeamChange} selectedTeam={team} />
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
                  onChange={inputHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                href="/login"
                type="submit"
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
      </form>
      
    </>
  )
}
  