import React, { useState } from 'react';
import SideBar from './SideBar';
import Profile from './Profile-Menu';
import DarkMode from './DarkMode';
import {generateDate, months } from './GenerateDate';
import dayjs from "dayjs";
import { firestore as db } from './firebase';
import { addDoc, collection, getDocs, where, query, doc, updateDoc, getDoc } from 'firebase/firestore';
import cn from './cn'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Tasks() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
  

  console.log(generateDate());
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return(
  <div className="flex dark:bg-gray-950 bg-white">           
    <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
    <div className='flex flex-col flex-1 w-full"'> 
      <header className='justify-content z-10 mt-5 bg-white shadow-md dark:bg-gray-950'>
        <div className="flex md:justify-center flex-1 lg:mr-32">
            <div>
                <button className="mr-10 ml-3 rounded-lg bg-blue-200 md:hidden block dark:bg-gray-900 dark:text-white text-black p-2" onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <div className=" relative w-40 justify-center md:w-full max-w-xl mr-6 focus-within:text-purple-500">
                <div className="absolute mb-6 inset-y-0 flex items-center pl-2">
                <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
                </div>
                <input className="w-full pl-8 pr-2 text-large dark:text-black    text-black placeholder-blue-600 bg-gray-200 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-blue dark:focus:placeholder-gray-600 dark:bg-gray-200focus:placeholder-gray-500 focus:bg-white focus:border-red-300 focus:outline-none focus:shadow-outline-purple focus:text-blue-500 form-input" type="text" placeholder="Search" aria-label="Search"></input>
            </div> 
            <div className='mt-1'>
                <DarkMode/>
            </div> 
            
            <Profile/>

          </div> 
      </header>
      <main>
        {/* <div className="mt-5 flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto h-screen items-center sm:flex-row flex-col"> */}
        <div className="mt-5 ml-10 flex sm:flex-row flex-col sm:divide-x sm:w-1/2 h-screen gap-10">
          <div className="w-96 h-96 ">
            <div className="flex justify-between items-center">
              <h1 className="select-none font-semibold">
                {months[today.month()]}, {today.year()}
              </h1>
              <div className="flex gap-10 items-center ">
                <GrFormPrevious
                  className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                  onClick={() => {
                    setToday(today.month(today.month() - 1));
                  }}
                />
                <h1
                  className=" cursor-pointer hover:scale-105 transition-all"
                  onClick={() => {
                    setToday(currentDate);
                  }}
                >
                  Today
                </h1>
                <GrFormNext
                  className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                  onClick={() => {
                    setToday(today.month(today.month() + 1));
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-7 ">
              {days.map((day, index) => {
                return (
                  <h1
                    key={index}
                    className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                  >
                    {day}
                  </h1>
                );
              })}
            </div>

            <div className=" grid grid-cols-7 ">
              {generateDate(today.month(), today.year()).map(
                ({ date, currentMonth, today }, index) => {
                  return (
                    <div
                      key={index}
                      className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                    >
                      <h1
                        className={cn(
                          currentMonth ? "" : "text-gray-400",
                          today
                            ? "bg-red-600 text-white"
                            : "",
                          selectDate
                            .toDate()
                            .toDateString() ===
                            date.toDate().toDateString()
                            ? "bg-black text-white"
                            : "",
                          "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                        )}
                        onClick={() => {
                          setSelectDate(date);
                        }}
                      >
                        {date.date()}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="h-96 w-96 sm:px-5">
            <h1 className=" font-semibold">
              Schedule for {selectDate.toDate().toDateString()}
            </h1>
            <p className="text-gray-400">No meetings for today.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
  )
 
}


