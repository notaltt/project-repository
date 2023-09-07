import React, { useState } from 'react';
import SideBar from './SideBar';

const teams = [
    {
        name: 'Data Wranglers',
        description: '6 members',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
    },
    {
        name: 'Information Navigators',
        description: '4 members',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
    },
    {
        name: 'Data Surgeons',
        description: '7 members',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
    },
]

const people = [
    {
        name: 'Leslie Alexander',
        message: 'Deleted readme.md',
        team: "Data Surgeons",
        role: 'Intern',
        imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        message: 'Added icon.png',
        team: "Information Navigators",
        role: 'Front-end Developer',
        imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries Vincent',
        message: 'Updated App.js',
        team: "Data Wranglers",
        role: 'Business Relations',
        imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3m ago',
    },
    {
        name: 'Lindsay Walton',
        message: 'Added you to team \'Data Surgeons\'',
        team: "Data Surgeons",
        role: 'Manager',
        imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Courtney Henry',
        message: 'Added helloworld.txt',
        team: "Information Navigators",
        role: 'Designer',
        imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Tom Cook',
        message: 'Created folder \'dataset\'',
        team: "Data Wranglers",
        role: 'Director of Product',
        imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '15m ago',
    },
]

export default function Dashboard(){
    return(
        <div className="flex bg-white">  
           
            <SideBar/>
            
            <div className='flex flex-col flex-1 w-full"'>
                <header className='justify-content z-10 py-4 bg-white shadow-md dark:bg-white'>
                    
                <div className="flex justify-center flex-1 lg:mr-32">
                        <div className="  relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                            <div className="absolute inset-y-0 flex items-center pl-2">
                            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                            </svg>
                            </div>
                            <input className="w-full pl-8 pr-2 text-large text-black placeholder-blue-600 bg-gray-200 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-blue dark:focus:placeholder-gray-600 dark:bg-gray-200 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-red-300 focus:outline-none focus:shadow-outline-purple focus:text-blue-500 form-input" type="text" placeholder="Search" aria-label="Search"></input>
                        </div>  
                    </div> 
                </header>
                <main>
                    {/* put code what is inside the content page */}
                    <div className="bg-gray-100">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                            <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-none lg:py-8">
                            <h2 className="text-3xl font-bold text-black-700 opacity-70">Teams You're In</h2>

                            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                                {teams.map((team) => (
                                <div key={team.description} className="group relative">
                                    <div className="relative h-70 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <img
                                        src={team.imageSrc}
                                        alt={team.imageAlt}
                                        className="h-full w-full object-cover object-center"
                                    />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                    <a href={team.href}>
                                        <span className="absolute inset-0" />
                                        {team.description}
                                    </a>
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{team.name}</p>
                                </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul role="list" className="divide-y divide-gray-100 px-6 bg-gray-100 mt-10">
                            <h2 className="text-3xl font-bold text-black-700 opacity-70 py-8 sm:py-12 lg:py-8 border-b-2 border-gray-500">Notifications</h2>
                        {people.map((person) => (
                            <li key={person.message} className="flex justify-between gap-x-6 py-5  pe-6">
                            <div className="flex min-w-0 gap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                                <div className="min-w-0">
                                <p className="text-sm text-start font-semibold leading-6 text-gray-900">{person.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.message} | {person.team}</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                {person.lastSeen ? (
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                </p>
                                ) : (
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                                )}
                            </div>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
       
    );
}