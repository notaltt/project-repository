      import React, { useState } from 'react';
      import profile from '../images/profile-picture-5.jpg'
      import AuthDetails from "./AuthDetails"
      import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
      
      export default function Dashboard(){

        const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };
          const [open,setOpen] = useState(false)
          return(
            <div className='menu-contianer'>
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                <img alt='profile' src={profile}></img>
            </div>
            <div className={`dropdown-menu   ${open? 'active' : 'inactive'}`} >
                <h3 className='text-xm'><AuthDetails /></h3>
                <ul>
                    <DropdownItem text = {"My Profile"} href='/files'/>
                  
                </ul>
                <button className='hover:text-red-800' onClick={handleLogout}>Logout</button>
            </div>
            
        </div>
          );
      }
      function DropdownItem(props){
          return(
              <li>
                  <img alt='' src={props.img}></img>
                  <a href={props.href}>{props.text}</a>
              </li>
          )
      }                 
                       