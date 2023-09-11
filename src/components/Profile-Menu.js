                       
                       
      import React, { useState } from 'react';
      import profile from '../images/profile-picture-5.jpg'
      
      
      
      export default function Dashboard(){
          const [open,setOpen] = useState(false)
          return(
            <div className='menu-contianer'>
            <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                <img src={profile}></img>
            </div>
            <div className={`bg-blue-400 dropdown-menu ${open? 'active' : 'inactive'}`} >
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
                  <img src={props.img}></img>
                  <a href={props.href}>{props.text}</a>
              </li>
          )
      }                 
                       