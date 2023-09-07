import React, { useState } from 'react';
import myImage from '../images/logo.png';

export default function Dashboard(){
    return(
        <div className="flex bg-white h-screen">  
           
            <aside className='z-20 hidden w-64 overflow-y-auto bg-white dark:bg-sky-100   md:block flex-shrink-0' >
                
                <div className='py-4 text-black dark:text-black'>

                        <a className='ml-4 flex items-center text-xl font-bold text-blue-800 dark:text-blue-500' href="/dashboard">
                            <img
                            className="mr-5 h-6 w-auto "
                            src={myImage}/>
                            <h1>PRIVO</h1>
                        </a>
                        
                    <ul class="mt-6">
                        <li className="relative px-6 py-3">
                        <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                        <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200 dark:text-blue-400" href="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span className="ml-4">Home</span>
                        </a>
                        </li>
                    </ul>
                    <ul>
                        <li className="relative px-6 py-3">
                        <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-blue-400" href="/files">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                            </svg>
                            <span className="ml-4">Files</span>
                        </a>
                        </li>
                        <li className="relative px-6 py-3">
                        <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-blue-400" href="/team">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            <span className="ml-4">Team</span>
                        </a>
                        </li>
                        
                    </ul>
                </div>
            </aside>
            <div className='flex flex-col flex-1 w-full"'>
                <header className='justify-content z-10 py-4 bg-white shadow-md dark:bg-white'>
                    
                <div class="flex justify-center flex-1 lg:mr-32">
                        {/* <a className='mr-10 align-right flex items-center text-xl font-bold text-blue-800 dark:text-blue-500' href="/dashboard">
                            <img
                            className="ml-5 mr-5 h-6 w-auto "
                            src={myImage}/>
                            <h1>PRIVO</h1>
                        </a> */}
                        <div class="  relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                            <div class="absolute inset-y-0 flex items-center pl-2">
                            <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                            </div>
                            <input class="w-full pl-8 pr-2 text-large text-black placeholder-blue-600 bg-gray-200 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-blue dark:focus:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-red-300 focus:outline-none focus:shadow-outline-purple focus:text-blue-500 form-input" type="text" placeholder="Search" aria-label="Search"></input>
                        </div>  
                    </div> 
                </header>
                <main>
                    {/* put code what is inside the content page */} 
                </main>
            </div>
        </div>
       
    );
}