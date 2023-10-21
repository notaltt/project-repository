import SideBar from "./SideBar";
import Profile from "./Profile-Menu";
import DarkMode from "./DarkMode";
import React, { useEffect, useState } from "react";
import { firestore as db } from "./firebase";
import { addDoc, collection, getDocs, where, query, doc, updateDoc, getDoc, } from "firebase/firestore";

export default function Tasks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return(
    <div className="flex bg-white dark:bg-gray-950 h-screen overflow-hidden': isSideMenuOpen }">  
           
    <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

     

    </div>
  )
 
}