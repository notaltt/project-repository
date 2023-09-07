import React, { useState } from 'react';
import SideBar from './SideBar';
import folder from  '../images/folder.png';
import text from  '../images/text.webp';

const navigation = [
    {
        title: 'Home',
        d: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
        href: '/dashboard',
        active: false
    },
    {
        title: 'Files',
        d: 'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z',
        href: '/files',
        active: true
    },
    {
        title: 'Team',
        d: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
        href: '/team',
        active: false
    },
]

const directory = [
    {
        name: 'important files',
        modified_last: 'September 6, 2023',
        modified_by: 'Johnnie Walker',
        filesize: null,
    },
    {
        name: 'top secret',
        modified_last: 'September 6, 2023',
        modified_by: 'Johnnie Walker',
        filesize: null,
    },
    {
        name: 'read_me.txt',
        modified_last: 'September 6, 2023',
        modified_by: 'Johnnie Walker',
        filesize: 10000,
    },
    {
        name: 'hello_world.txt',
        modified_last: 'September 6, 2023',
        modified_by: 'Johhnie Walker',
        filesize: 10000,
    },
    {
        name: 'road_to_graduation.txt',
        modified_last: 'September 6, 2023',
        modified_by: 'Johnnie Walker',
        filesize: 10000,
    },
    {
        name: 'team_sched.txt',
        modified_last: 'September 6, 2023',
        modified_by: 'Johnnie Walker',
        filesize: 10000,
    },
]

export default function Files(){
    return(
        <div className="flex bg-white h-screen overflow-hidden': isSideMenuOpen }">  
           
           <SideBar/>

            <div className='class="flex flex-col flex-1 w-full"'>
                <header className='z-10 py-4 bg-white shadow-md dark:bg-white'>
                    
                <div class="flex justify-start flex-1 lg:mr-32">
                        <a className='ml-20'>
                            <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Recent Activity</button>
                        </a>
                            <span class="relative top-0 right-0 h-3 w-3 bg-red-600 d-500 rounded-full -translate-x-4 -translate-y-0.5"></span>
                        
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
                <main classname="bg-gray-100">
                    {/* put code what is inside the content page */}
                    <h1>HELLO ROMEO BAYOT</h1>
                    <div className="space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-6 lg:space-y-0">
                        {directory.map((content) => {
                            
                            const hasFileExtension = content.name.includes('.');
                            const imgSrc = hasFileExtension ? text : folder;
                            const fileDescription = hasFileExtension ? 'text file' : 'folder';
                            
                            return (
                            <div key={content.description} className="bg-white shadow-md rounded-lg p-6 group relative">
                                <img className="h-52 w-auto mx-auto" src={imgSrc}/>
                                <h2 className="text-xl font-bold opacity-80">{content.name}</h2>
                                <p className="text-gray-600">{fileDescription}</p>
                            </div>);
                        })}
                    </div>
                </main>
            </div>
        </div>
       
    )
}