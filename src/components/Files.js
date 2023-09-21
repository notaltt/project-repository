import SideBar from './SideBar';
import FileUpload from './FileUpload';
import Profile from './Profile-Menu';
import folder from  '../images/folder.png';
import text from  '../images/text.webp';
import DarkMode from './DarkMode';
import FileDetail from './FileDetails'
import FileList from './FileList';
import {ReactComponent as CloudIcon} from '../images/cloudicon.svg';
import { useState } from 'react';


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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [fileUploadActive, setFileUploadActive] = useState(false);

    const toggleFileUpload = () => {
        setFileUploadActive(!fileUploadActive);
    };

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }
  
    return(
        <div className="flex bg-white dark:bg-gray-950 h-screen overflow-hidden': isSideMenuOpen }">  
           
           <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

            <div className='class="flex flex-col flex-1 w-full"'>
            <header className='justify-content z-10 mt-5 bg-white shadow-md dark:bg-gray-950'>
                
                <div className="flex md:justify-center flex-1 lg:mr-32">
                    <div>
                        <button className="mr-10 ml-3 rounded-lg bg-blue-200 md:hidden block dark:bg-gray-900 dark:text-white text-black p-2" onClick={toggleSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className=" relative w-40 md:w-full max-w-xl mr-6 focus-within:text-purple-500">
                        <div className="absolute mb-6 inset-y-0 flex items-center pl-2">
                        <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                        </div>
                        <input className="w-full pl-8 pr-2 text-large dark:text-black    text-black placeholder-blue-600 bg-gray-200 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-blue dark:focus:placeholder-gray-600 dark:bg-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-red-300 focus:outline-none focus:shadow-outline-purple focus:text-blue-500 form-input" type="text" placeholder="Search" aria-label="Search"></input>
                    </div> 
                    <div className='mt-1'>
                        <DarkMode/>
                    </div> 
                    <Profile/>
                </div> 
            </header>
                <main>
                    <button onClick={toggleFileUpload} title="Upload" class="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl">
                        <span className="text-white">
                            <CloudIcon stroke="currentColor" />
                        </span>
                    </button>
                    <FileUpload isVisible={fileUploadActive} />
                    <FileList />
                </main>
            </div>
        </div>
       
    )
}