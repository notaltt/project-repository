import React, { useState } from 'react';
import SideBar from './SideBar';
import Profile from './Profile-Menu';

export default function Team(){
    return(
        <div className="flex bg-white h-screen">  
           
           <SideBar/>

            <div className='class="flex flex-col flex-1 w-full"'>
                <header className='z-10 py-4 bg-white shadow-md dark:bg-white'>
                    
                    <div class="flex justify-start flex-1 lg:mr-32">
                        <a className='ml-20'>
                            <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Member</button>
                        </a>
                            <div class="  relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                                <div class="absolute inset-y-0 flex items-center pl-2">
                                <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                </svg>
                                </div>
                                <input class="w-full pl-8 pr-2 text-large text-black placeholder-blue-600 bg-gray-200 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-blue dark:focus:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-red-300 focus:outline-none focus:shadow-outline-purple focus:text-blue-500 form-input" type="text" placeholder="Search" aria-label="Search"></input>
                            </div>  
                            <Profile/>
                        </div> 
                </header>
                <main>
                    {/* put code what is inside the content page */}
                </main>
            </div>
        </div>
       
    );
}