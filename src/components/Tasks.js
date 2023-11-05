import React, { useState } from 'react';
import SideBar from './SideBar';
import Profile from './Profile-Menu';
import DarkMode from './DarkMode';
import {generateDate, months } from '../components-additional/GenerateDate';
import dayjs from "dayjs";
import cn from '../components-additional/cn'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import TeamSelector from '../components-additional/TeamSelector';

export default function Tasks() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);

  const [selectedTeam, setSelectedTeam] = useState("");

  const user = {
    uid: 'the-user-id',
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
    console.log(team)
  };
  

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
              <div className=" relative w-40 justify-center md:w-full max-w-xl mr-6 focus-within:text-purple-500">
              <TeamSelector onTeamSelect={handleTeamChange} />
            </div> 
            <div>
                <button className="mr-10 ml-3 rounded-lg bg-blue-200 block dark:bg-gray-900 dark:text-white text-black p-2">
                  Add Task
                </button>
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


