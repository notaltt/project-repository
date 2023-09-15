import SideBar from './SideBar';
import FileUpload from './FileUpload';
import Profile from './Profile-Menu';
import folder from  '../images/folder.png';
import text from  '../images/text.webp';


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
                        <a href="files" className='ml-20'>
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
                        <Profile/>
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
                                <img alt={content.name} className="h-52 w-auto mx-auto" src={imgSrc}/>
                                <h2 className="text-xl font-bold opacity-80">{content.name}</h2>
                                <p className="text-gray-600">{fileDescription}</p>
                            </div>);
                        })}
                    </div>
                    <FileUpload/>
                </main>
            </div>
        </div>
       
    )
}