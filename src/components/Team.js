import SideBar from "./SideBar";
import Profile from "./Profile-Menu";
import DarkMode from "./DarkMode";
import React, { useEffect, useState } from "react";
import { firestore as db } from "./firebase";
import { addDoc, collection, getDocs, where, query, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { auth } from '../../src/components/firebase';

export default function Team() {
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
  const currentUser = auth.currentUser;


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
  const fetchTeam = async () => {
    const teams = [];
    try {
      const teamRef = collection(db, "team");
      const teamSnapshot = await getDocs(teamRef);
      teamSnapshot.forEach(async (doc) => {
        const teamData = doc.data();
        const members = teamData.members || [];
        const totalMembers = members.length;
  
        teams.push({ id: doc.id, ...teamData, totalMembers });
      });
    } catch (error) {
      console.error("Error fetching team:", error);
    }
    setTeam(teams);
    console.log("AVALAIBLE" + teams + "UNTIL HERE");
  };


  // //user integrated
  // const fetchTeam = async (user) => {
  //   const teams = [];
  //   try {
  //     console.log("user" + user + "ends");

  //     const userRef = doc(db, 'users', user.uid);
  //     const userSnapshot = await getDoc(userRef);

  //     if (userSnapshot.exists()) {
  //       console.log("exists");
  //       const userData = userSnapshot.data();
  //       const userTeams = userData.teams || [];

  //       console.log("userTeams", userTeams);

  //       const teamRef = collection(db, 'team');
  //       const teamQuery = query(teamRef, where('teamName', 'array-contains-any', userTeams));
  //       const teamSnapshot = await getDocs(teamQuery);

  //       teamSnapshot.forEach((doc) => {
  //         const teamData = doc.data();
  //         const members = teamData.members || [];
  //         const totalMembers = members.length;

  //         teams.push({ id: doc.id, ...teamData, totalMembers });
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching team:", error);
  //   }
  //   setTeam(teams);
  //   console.log("AVAILABLE", teams);
  // };

  const fetchUsers = async () => {
    const users = [];
    try {
      const teamRef = collection(db, "users");
      const teamSnapshot = await getDocs(teamRef);
      teamSnapshot.forEach((doc) => {
        users.push(doc.data());
      });
    } catch (error) {
      console.error("Error fetching team:", error);
    }
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    if (currentUser && !hasFetched) {
      fetchTeam(currentUser);
      setHasFetched(true); 
    } else if (!currentUser) {
      console.log("User is not authenticated.");
    }

    fetchUsers();
  }, [currentUser, hasFetched]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value); 
  };

  const handleAddUser = async () => {
    if (selectedUser) {
      setErrorModalMessage(''); // Clear any previous error message
      console.log(selectedUser);
      try {
        
        const teamCollection = collection(db, 'team');
        const teamDoc = doc(teamCollection, selectedId);
        const newMember = selectedUser;
  
        const docSnapshot = await getDoc(teamDoc);
        const currentMembers = docSnapshot.data().members || [];

        const userCollection = collection(db, 'users');
        const userQuery = query(userCollection, where('name', '==', selectedUser));
        const userSnapshot = await getDocs(userQuery);
  
        if (currentMembers.includes(newMember)) {
          
          setErrorModalMessage(`${newMember} is already a member of the team.`);
          openErrorModal();
          console.log(`${newMember} is already a member of the team.`);
        } else {
          
          currentMembers.push(newMember);
  
          await updateDoc(teamDoc, {
            members: currentMembers,
          });

          if(userSnapshot.size === 1){
            const userDoc = doc(userCollection, userSnapshot.docs[0].id);
            const userTeam = userSnapshot.docs[0].data().teams || [];
            userTeam.push(selectedId);
            await updateDoc(userDoc, { teams: userTeam });
            console.log("Teams added in the user's field.")
          }else{
            console.log("asdasd");
          }
  
          console.log(`Added ${newMember} to the 'members' field of the document.`);
  
          
          //window.location.reload();
        }
      } catch (error) {
        console.error('Error adding member:', error);
        setErrorModalMessage('An error occurred while adding the user.'); 
        openErrorModal();
      }
    }
  };
  

  
  const handleRemoveUser = async () => {
    if (selectedUser) {
      setErrorModalMessage(''); // Clear any previous error message
      try {
        const teamCollection = collection(db, 'team');
        const teamDoc = doc(teamCollection, selectedId);
  
        const docSnapshot = await getDoc(teamDoc);
        const currentMembers = docSnapshot.data().members || [];
  
        if (!currentMembers.includes(selectedUser)) {

          setErrorModalMessage(`${selectedUser} is not a member of the team.`);
          openErrorModal();
          console.log(`${selectedUser} is not a member of the team.`);
        } else {
          
          const updatedMembers = currentMembers.filter((member) => member !== selectedUser);
  
          await updateDoc(teamDoc, {
            members: updatedMembers,
          });
  
          console.log(`Removed ${selectedUser} from the 'members' field of the document.`);
  
          
          //window.location.reload();
        }
      } catch (error) {
        console.error('Error removing member:', error);
        setErrorModalMessage('An error occurred while removing the user.'); 
        openErrorModal();
      }
    }
  };
  

  const openErrorModal = () => {
    setisErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setisErrorModalOpen(false);
  };

  return (
    <div className='flex dark:bg-gray-950 bg-white h-screen'>
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className='flex flex-col flex-1 w-full"'>
        <header className='justify-content z-10 mt-5 bg-white shadow-md dark:bg-gray-950'>
          <div className='flex md:justify-center flex-1 lg:mr-32'>
            <div>
              <button
                className='mr-10 ml-3 rounded-lg bg-blue-200 md:hidden block dark:bg-gray-900 dark:text-white text-black p-2'
                onClick={toggleSidebar}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              </button>
            </div>
            <div className=' relative w-40 md:w-full max-w-xl mr-6 focus-within:text-purple-500'>
              <div className='absolute mb-6 inset-y-0 flex items-center pl-2'>
                <svg
                  className='w-4 h-4'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                className='w-full pl-8 pr-2 text-large dark:text-black    text-black placeholder-blue-600 bg-gray-200 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-blue dark:focus:placeholder-gray-600 dark:bg-gray-200focus:placeholder-gray-500 focus:bg-white focus:border-red-300 focus:outline-none focus:shadow-outline-purple focus:text-blue-500 form-input'
                type='text'
                placeholder='Search'
                aria-label='Search'
              ></input>
            </div>
            <div className='mt-1'>
              <DarkMode />
            </div>

            <Profile />
          </div>
        </header>
        <main className='dark:bg-gray-900 dark:text-white text-black'>
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
                <button onClick={() => closeTeam()}>Go back</button>
              </div>
                </>

              )
              :
              (<>
              <p>No members in this team.</p>
              <button onClick={() => closeTeam()}>Go back</button><br></br>
              </>
              )}
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
                <br/><button onClick={handleAddUser}>Add User</button>
                <br/><button onClick={handleRemoveUser}>Remove User</button>
              </div>

              {isErrorModalOpen && (
                <div id="modal" className="fixed top-0 left-0 w-full h-full bg-opacity-80 bg-gray-900 flex justify-center items-center">
                  <div className="bg-white dark:text-white dark:bg-gray-500 rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold mb-4">Error!</h2>
                    <p id="error-message">{ErrorModalMessage}</p>
                    <button onClick={closeErrorModal} className="mt-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold px-4 py-2 rounded">Close</button>
                  </div>
                </div>
              )}
              
            </>

            
          )}
        </main>
      </div>
    </div>
  );
}