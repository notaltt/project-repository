import myImage from '../images/logo.png';

const currentPathname = window.location.pathname;

const navigation = [
    {
        title: 'Home',
        icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
        href: '/dashboard',
        active: currentPathname === '/dashboard',
    },
    {
        title: 'Files',
        icon: 'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z',
        href: '/files',
        active: currentPathname === '/files',
    },
    {
        title: 'Team',
        icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
        href: '/team',
        active: currentPathname === '/team',
    },
    
]

const SideBar = ({ isOpen, toggleSidebar }) =>{
    return (
        
        <aside className={`z-50 text-black dark:text-white sm:sticky w-screen h-screen absolute bg-sky-200 sm:w-64 sm:h-auto  dark:bg-gray-900  md:block flex-shrink-0  ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`} >
                
            <div className='py-4 '>
                
            
                <div className='flex'>
                    <a className='ml-4 ' href="dashboard">
                        <img
                        className="mr-2 h-6 "
                        alt='privo'
                        src={myImage}/>
                        
                    </a>
                    <a href="dashboard">
                        <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 to-blue-800'>PRIVO</h1>
                    </a>
                    <button className="rounded-xl ml-64 block md:hidden p-1 dark:text-white hover:bg-blue-300 text-black" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                
                </div>
                
                
                <ul className=" mt-6">
                    {navigation.map((item) => (
                        <li className="relative px-6 py-3">
                            {item.active && (
                                <span className="absolute inset-y-0 left-0 w-1 bg-purple-950 le-600 rounded-tr-lg rounded-br-lg" aria-hidden="false"></span>
                            )}
                            <a
                                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                                item.active
                                    ? 'dark:hover:text-blue-200 dark:text-purple-800'
                                    : 'dark:hover:text-red-400'
                                }`}
                                href={item.href}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                <span className="ml-4">{item.title}</span>
                            </a>
                        </li>    
                           
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default SideBar;