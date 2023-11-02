import SideBar from './SideBar';
import Profile from './Profile-Menu';
import DarkMode from './DarkMode';
import React, { useState, useEffect } from 'react';
import AuthDetails from './AuthDetails';
import { firestore as db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, where, query, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from '../../src/components/firebase';
import { pushNotifications } from './notifications';




export default function Dashboard(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showTeam, setshowTeam] = useState(true);
    const [team, setTeam] = useState();
    const [selectedId, setSelectedId] = useState();
    const [member, setMember] = useState();
    const [users, setUsers] = useState();
    const [selectedUser, setSelectedUser] = useState("");
    const [isErrorModalOpen, setisErrorModalOpen] = useState(false);
    const [ErrorModalMessage, setErrorModalMessage] = useState("");
    const [hasFetched, setHasFetched] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [renameTeamOpen, setRenameTeamOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isManager, setIsManager] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user);
            if (!hasFetched) {
              getUser(user)
              fetchTeam(user);
              fetchUsers(user);
              checkUserRole(user); // Add this line to check the user's role
              setHasFetched(true);
            }
          } else {
            console.log("User is not authenticated.");
          }
        });
      
        // Unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
      }, [hasFetched]);

      const getUser = async (user) => {
        try{
          const userData = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userData);
    
          if(userDoc.exists()){
            const userData = userDoc.data();
            const userAvatar = userData.avatar;
            const userName = userData.name;
            const userRole = userData.role;
    
            setUserName(userName);
            setUserAvatar(userAvatar);
            setUserRole(userRole);
          }
        }catch(e){
    
        }
      };

      const checkUserRole = async (user) => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
      
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const userRole = userData.role; // Replace 'role' with the actual field name where the role is stored
      
            if (userRole === "manager") {
              setIsManager(true);
              console.log(userRole);
              console.log("User is a manager");
            }
            else if(userRole === "member"){
              setIsManager(false);
              console.log(userRole);
              console.log("User is a member");
            }
          }
        } catch (error) {
          console.error("Error checking user role:", error);
        }
      };

      function openRenameTeam(){
        setRenameTeamOpen(!renameTeamOpen);
      }
    
      function closeRenameTeam(){
        setRenameTeamOpen(!renameTeamOpen);
      }
    
      const renameTeam = async () => {
        try {
          const teamCollection = collection(db, 'team');
          const teamDoc = doc(teamCollection, selectedId);
      
          await updateDoc(teamDoc, {
            teamName: newTeamName,
          });
    
          console.log(`Team name updated to ${newTeamName}`);
          
          // Close the rename team modal or update the team name in the state.
          setRenameTeamOpen(false);
          // You may want to update the team name in your local state here.
        } catch (error) {
          console.error('Error renaming team:', error);
          setErrorModalMessage('An error occurred while renaming the team.');
          openErrorModal();
        }
        window.location.reload();
      };
    
      const handleRenameTeam = () => {
        if (newTeamName.trim() === '') {
          // Show an alert with an error message
          alert('Team name cannot be empty or contain only spaces.');
        } else {
          renameTeam();
        }
      };
    
    
    
      function closeTeam() {
        setshowTeam(!showTeam);
      }
      function openTeam(id) {
        setshowTeam(!showTeam);
        let members = [];
        // GI SUD NAKO SA STATE VARIABLE INIG CLICK PARA KIBAW UNSA NGA TEAM
    
        if (team) {
          team.forEach((element) => {
            setSelectedId(id);
            if (element.id === id) {
              element.members.map((member) => {
                members.push(member);
              });
            }
          });
          setMember(members);
        }
        console.log(id);
        
      }
    
      // every user can see all teams
      const fetchTeam = async (user) => {
        const teams = [];
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);
      
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const userCompany = userData.company;
            //const userTeams = userData.teams || [];
      
            const teamRef = collection(db, "team");
            const queryCompany = query(teamRef, where('fromCompany', '==', userCompany));
            const companySnapshot = await getDocs(queryCompany);
      
            companySnapshot.forEach((companyDoc) => {
              const companyData = companyDoc.data();
              const members = companyData.members || [];
              const totalMembers = members.length;
              
              teams.push({ id: companyDoc.id, ...companyData, totalMembers });
            });
          }
        } catch (error) {
          console.error("Error fetching team:", error);
        }
        setTeam(teams);
        console.log("AVAILABLE", teams, "UNTIL HERE");
      };

      const fetchUsers = async (user) => {
        const users = [];
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);
    
          if(userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const userCompany = userData.company;
    
            const companyRef = collection(db, 'users');
            const companyQuery = query(companyRef, where('company', '==', userCompany));
            const companySnapshot = await getDocs(companyQuery);
    
            companySnapshot.forEach((doc) => {
              users.push(doc.data());
            });
          }
        } catch (error) {
          console.error("Error fetching team:", error);
        }
        setUsers(users);
        console.log(users);
      };

      const handleUserChange = (event) => {
        setSelectedUser(event.target.value); 
      };
    
      const handleAddUser = async () => {
    
        if (!selectedUser) {
          setErrorModalMessage('Please select a user before adding.');
          openErrorModal();
          return; // Exit the function to prevent further execution
        }
      
        try {
          const teamCollection = collection(db, 'team');
          const teamDoc = doc(teamCollection, selectedId);
          const newMember = selectedUser;
    
          const userCollection = collection(db, 'users');
          const userQuery = query(userCollection, where('name', '==', selectedUser));
          const userSnapshot = await getDocs(userQuery);
      
          const docSnapshot = await getDoc(teamDoc);
          const currentMembers = docSnapshot.data().members || [];
      
          // Check if the selectedUser is already a member
          if (currentMembers.includes(newMember)) {
            setErrorModalMessage(`${newMember} is already a member of the team.`);
            openErrorModal();
            return; // Exit the function to prevent further execution
          }
      
          // Add the selectedUser to the current members
          currentMembers.push(newMember);
      
          // Update the members in the team document
          await updateDoc(teamDoc, {
            members: currentMembers,
          });
    
          if(userSnapshot.size === 1){
            const userDoc = doc(userCollection, userSnapshot.docs[0].id);
            const userTeam = userSnapshot.docs[0].data().teams || [];
            userTeam.push(selectedId);
            await updateDoc(userDoc, { teams: userTeam });
            console.log("Teams added in the user's field.")
          }
    
          const notificationData = {
            time: new Date(),
            type: "team",
            content: "Added " + newMember +" to team " + selectedId 
          }
    
          console.log(`Added ${newMember} to the 'members' field of the document.`);
    
          pushNotifications(selectedId, userAvatar, userName, userRole, notificationData.time, notificationData.type, notificationData.content);
    
        } catch (error) {
          console.error('Error adding member:', error);
          setErrorModalMessage('An error occurred while adding the user.');
          openErrorModal();
        }
        window.location.reload();
      };
      
    
      
      const handleRemoveUser = async () => {
        if (!selectedUser) {
          setErrorModalMessage('Please select a user before removing.');
          openErrorModal();
          return; // Exit the function to prevent further execution
        }
      
        try {
          const teamCollection = collection(db, 'team');
          const teamDoc = doc(teamCollection, selectedId);
          const userToRemove = selectedUser;
      
          const docSnapshot = await getDoc(teamDoc);
          const currentMembers = docSnapshot.data().members || [];
      
          // Check if the selectedUser is not a member
          if (!currentMembers.includes(userToRemove)) {
            setErrorModalMessage(`${userToRemove} is not a member of the team.`);
            openErrorModal();
            return; // Exit the function to prevent further execution
          }
      
          // Remove the selectedUser from the current members
          const updatedMembers = currentMembers.filter((member) => member !== userToRemove);
      
          // Update the members in the team document
          await updateDoc(teamDoc, {
            members: updatedMembers,
          });
    
          const notificationData = {
            time: new Date(),
            type: "team",
            content: "Removed " + userToRemove +" from team " + selectedId 
          }
    
          pushNotifications(selectedId, userAvatar, userName, userRole, notificationData.time, notificationData.type, notificationData.content);
        } catch (error) {
          console.error('Error removing member:', error);
          setErrorModalMessage('An error occurred while removing the user.');
          openErrorModal();
        }
        window.location.reload();
      };
      
    
      const openErrorModal = () => {
        setisErrorModalOpen(true);
      };
    
      const closeErrorModal = () => {
        setisErrorModalOpen(false);
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
                {showTeam ? (
            <div>
              <div className='bg-gray-100 dark:bg-gray-800'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-12'>
                  <div className='mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-none lg:py-8'>
                    <h2 className='text-3xl font-bold dark:text-white text-gray-700 opacity-100'>
                      Teams You're In
                    </h2>
                    <div className='cursor-pointer mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
                      {team?.map((team) => (
                        <div
                          className='group relative'
                          onClick={() => openTeam(team.id)}
                        >
                          <div className='relative h-70 w-full overflow-hidden rounded-lg dark:text-white bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
                            <div>
                              <img
                                src={team.imageUrl}
                                // alt={team.imageAlt}
                                className='h-full w-full object-cover object-center'
                              />
                            </div>
                          </div>
                          <h3 className='p-3 text-sm dark:text-gray-400 text-gray-500'>
                            <p className='text-base font-semibold dark:text-white text-gray-900'>
                              {team.teamName}
                            </p>
                            
                              <span className='absolute inset-0' />
                              Total Members: {team.totalMembers}
          
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {team.map((team) => {
                <h1>{team.teamName}</h1>;
              })}
              
              {member && member.length > 0? (
                <>
                <div>
                  <h1>List of members</h1>
                <div
                  id='file-header'
                  className='h-full w-full grid grid-cols-3 pl-2 pt-3 border-b border-gray-300'
                >
                  <div className='flex'>
                    <h1>Member Name</h1>
                  </div>
                </div>
                <div className='h-full w-full grid  pl-2 pt-3 pb-3 border-b border-gray-300 hover:bg-gray-200'>
                  {member?.map((item, index) => (
                    <div className='flex'>{item}</div>
                  ))}

                  
                </div>
                <button onClick={() => closeTeam()} className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Go back</button>
              </div>
                </>

              )
              :
              (<>
              <p>No members in this team.</p>
              <button onClick={() => closeTeam()} className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Go back</button><br></br>
              </>
              )}
              {isManager && (
                <>           
                <label for='users'>Choose users:</label>

                <div>
                  <select name='users' id='users' onChange={handleUserChange}>
                    <option value=''>Select a user</option>{" "}
                    {users.map((user) => (
                      <option key={user.name} value={user.name}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <br/><button onClick={handleAddUser} className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Add User</button>
                  <br/><button onClick={handleRemoveUser} className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Remove User</button>
                  <br/><button onClick={openRenameTeam} className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Rename Team</button>
                </div>
                </>
              )}

              {isErrorModalOpen && (
                <div id="modal" className="fixed top-0 left-0 w-full h-full bg-opacity-80 bg-gray-900 flex justify-center items-center">
                  <div className="bg-white dark:text-white dark:bg-gray-500 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">Error!</h2>
                    <p id="error-message">{ErrorModalMessage}</p>
                    <button onClick={closeErrorModal} className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Close</button>
                  </div>
                </div>
              )}
              {renameTeamOpen && (
                <div id="modal" className="fixed top-0 left-0 w-full h-full bg-opacity-80 bg-gray-900 flex justify-center items-center">
                  <div className="bg-white dark:text-white dark:bg-gray-500 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">Input team name: </h2>
                    <p id="error-message"><input
                    type="text"
                    placeholder="Enter new team name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    /></p>
                    <button onClick={handleRenameTeam}className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Submit</button>
                    <button onClick={closeRenameTeam} className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Close</button>
                  </div>
                </div>
              )}

              {errorMessage && (
                      <div className="error-message">
                        <p>{errorMessage}</p>
                      </div>
              )}

              
            </>

            
          )}

                    <ul className="divide-y dark:divide-gray-100  divide-gray-100 px-6 dark:bg-gray-800 bg-gray-100 mt-10">
                            <h2 className="text-3xl font-bold dark:text-white text-gray-700 py-8 sm:py-12 lg:py-8 border-b-2 border-gray-500">Notifications</h2>
                        {people.map((person) => (
                            <li key={person.message} className="flex justify-between gap-x-6 py-5  pe-6">
                            <div className="flex min-w-0 bggap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50 me-4" src={person.imageUrl} alt="" />
                                <div className="min-w-0">
                                <p className="text-sm text-start dark:text-white  font-semibold leading-6 text-gray-900">{person.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 dark:text-white  text-gray-500">{person.message} | {person.team}</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 dark:text-white text-gray-900">{person.role}</p>
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