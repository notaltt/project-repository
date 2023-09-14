      import React, { useState } from 'react';
      import profile from '../images/profile-picture-5.jpg'
      
      
      
      export default function Dashboard(){
          const [open,setOpen] = useState(false)
          return(
            <div className='menu-contianer'>
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                <img alt='profile' src={profile}></img>
            </div>
            <div className={`dropdown-menu   ${open? 'active' : 'inactive'}`} >
                <h3>Kent<br></br><span>Web Designer</span></h3>
                <ul>
                    <DropdownItem text = {"My Profile"}/>
                    <DropdownItem text = {"Logout"} href ={"/files"}/>
                  
                </ul>
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
                       