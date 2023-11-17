import React, { useState, useEffect, useCallback } from 'react';
import SideBar from './SideBar';
import Profile from './Profile-Menu';
import DarkMode from './DarkMode';
import {generateDate, months } from '../components-additional/GenerateDate';
import dayjs from "dayjs";
import cn from '../components-additional/cn'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { firestore as db, addDoc } from './firebase'; 
import { getDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../src/components/firebase';

function Tasks({ user }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userCompany, setUserCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [isManager, setIsManager] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userRole, setUserRole] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const checkUserRole = useCallback(async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userRole = userData.role;

        if (userRole === "manager") {
          setIsManager(true);
          console.log(userRole);
          console.log("User is a manager");
        } else if (userRole === "member") {
          setIsManager(false);
          console.log(userRole);
          console.log("User is a member");
        }
      }
    } catch (error) {
      console.error("Error checking user role:", error);
    }
  }, []);

  const fetchTeam = useCallback(async (user) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);
  
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const userTeams = userData.teams || [];
  
        const teamRef = collection(db, 'team');
        const teamQuery = query(teamRef, where('teamName', 'array-contains-any', userTeams));
        const teamSnapshot = await getDocs(teamQuery);
  
        const teams = [];
  
        for (const docSnapshot of teamSnapshot.docs) {
          const teamData = docSnapshot.data();
          const members = teamData.members || [];
          const totalMembers = members.length;
  
          teams.push({ id: docSnapshot.id, ...teamData, totalMembers });
        }
  
        setJoinedTeams(teams);
  
        if (teams.length > 0) {
          const selectedTeamName = teams[0].teamName;
          setSelectedTeam(selectedTeamName);
  
          // Fetch users for the selected team
          const selectedTeamData = teams.find(t => t.teamName === selectedTeamName);
          if (selectedTeamData && selectedTeamData.members) {
            const usersDetails = await fetchUsersDetails(selectedTeamData.members);
            setUsers(usersDetails);
          }
        }
      } 
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  }, []);

  const getUser = useCallback(async (user) => {
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
  },[]);

  const fetchUsersDetails = useCallback(async (memberEmails) => {
    const usersRef = collection(db, 'users');
    const usersDetails = [];
  
    for (const email of memberEmails) {
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        usersDetails.push(doc.data());
      });
    }
  
    console.log('Users details:', usersDetails);
    return usersDetails;
  }, []);

  
  const getUserCompany = async (user) => {
  try {
      const userRef = doc(db, 'users', user.uid);
      const userUid = await getDoc(userRef);

      if (userUid.exists) {
          const userData = userUid.data();
          const userCompany = userData.company;
          setUserCompany(userCompany);
          setIsLoading(false);
      } else {
          console.log('User document not found');
          setUserCompany();
      }
      } catch (error) {
          console.error('Error fetching user data:', error);
          setUserCompany();
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        await checkUserRole(currentUser);
        await fetchTeam(currentUser);
        await getUser(currentUser);
      }
    };
  
    const fetchTeamUsers = async () => {
      if (selectedTeam) {
        const teamData = joinedTeams.find((t) => t.teamName === selectedTeam);
        if (teamData && teamData.members) {
          const usersDetails = await fetchUsersDetails(teamData.members);
          setUsers(usersDetails);
        }
      }
    };
  
    fetchData();
    fetchTeamUsers();
  }, [currentUser, selectedTeam, joinedTeams, checkUserRole, fetchTeam, fetchUsersDetails, getUser]);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      if (authenticatedUser) {
        // Set user state
        setCurrentUser(authenticatedUser);

        // Fetch teams and company data
        fetchTeam(authenticatedUser);
        getUserCompany(authenticatedUser);

        // Check the user role
        checkUserRole(authenticatedUser);
      } else {
        // Reset states when the user is not authenticated
        setCurrentUser(null);
        setUserCompany(null);
        setSelectedTeam('');
        setJoinedTeams([]);
        setIsManager(false);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        await checkUserRole(currentUser);
        await fetchTeam(currentUser);
        await getUser(currentUser);
      }
    };
  
  
    fetchUserData(); 
  }, [currentUser, selectedTeam, joinedTeams, checkUserRole, fetchTeam, fetchUsersDetails, getUser]);

  
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(generateDate());
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserChange = (event) => {
    setSelectedUserEmail(event.target.value);
  };

  return(
  <div className="flex dark:bg-gray-950 bg-white">           
    <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
    <div className='flex flex-col flex-1 w-full"'> 
      <header className='justify-content z-10 mt-5 bg-white shadow-md dark:bg-gray-950'>
        <div className="flex md:justify-center flex-1 lg:mr-32">
              <div className=" relative w-40 justify-center md:w-full max-w-xl mr-6 focus-within:text-purple-500">
              <div>
                <select
                  className="w-full pl-8 pr-2 text-large dark:text-black text-black placeholder-blue-600 bg-gray-200 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-blue dark:focus:placeholder-gray-600 
                  dark:bg-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-red-300 focus:outline-none focus:shadow-outline-purple focus:text-blue-500 form-input"
                  aria-label="Choose Team"
                  value={selectedTeam} // Control the selected value with React state
                  onChange={(e) => {
                    console.log('Selected team:', e.target.value);
                    const selectedId = e.target.value;
                    const team = joinedTeams.find((team) => team.id === selectedId);
                    setSelectedTeam(team ? team.teamName : ''); // Update the state based on selected option
                  }}
                  id="team-select"
                >
                  {joinedTeams && joinedTeams.length > 0 ? (
                        joinedTeams.map((team) => (
                          <option key={team.id}>
                            {team.teamName}
                          </option>
                        ))
                  ): (
                    <div>
                        No teams available or you're not part of any teams.
                    </div>
                  )}
                </select>
            </div>
            </div> 
            <div>
            {isManager && ( // This will only render the button if isManager is true
              <button
                className="mt-0 ml-5 mr-5 gap-10 h-12 w-32 flex-none rounded-full bg-sky-300 hover:bg-cyan-200 me-4 font-semibold"
                onClick={openModal}
              >
                Add Task
              </button>
            )}
            </div>
            <div className='mt-2 position-absolute right-0'>
              <DarkMode/>
            </div> 
            <Profile/>
          </div> 
      </header>
      <main>
        {/* <div className="mt-5 flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto h-screen items-center sm:flex-row flex-col"> */}
        <div className="mt-5 ml-10 flex sm:flex-row flex-col sm:divide-x w-full justify-center h-screen gap-10">
          <div className="w-96 h-96 ">
            <h1 className="font-semibold">Added Tasks</h1>
            <div className="mt-4 border rounded p-2">
              Make Tasks
            </div>
            <div className="mt-4 border rounded p-2">
              Make Tasks
            </div>
            <div className="mt-4 border rounded p-2">
              Make Tasks
            </div>
            <div className="mt-4 border rounded p-2">
              Make Tasks
            </div>
            <div className="mt-4 border rounded p-2">
              Make Tasks
            </div>
            <div className="mt-4 border rounded p-2">
              Make Tasks
            </div>
          </div>
          <div className=" w-96 h-96">
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
              Tasks for {selectDate.toDate().toDateString()}
            </h1>
            <p className="text-gray-400">No Tasks for today.</p>
          </div>
        </div>

        {isModalOpen && (
          <div id="modal" className="fixed top-0 left-0 w-full h-full bg-opacity-80 bg-gray-900 flex justify-center items-center">
            <div className="bg-white dark:text-white dark:bg-gray-500 rounded-lg shadow-lg p-12">
              <div className="flex flex-col w-full h-full justify-start items-start">
                <h1 className="font-semibold">Team: {selectedTeam}</h1>
              </div>
              <form className="space-y-6">
                <div className="flex space-x-6">
                  <div className="flex-1">
                    <label htmlFor="taskName" className="flex text-lg font-medium leading-6 dark:text-white text-gray-900 items-stretch">
                      Task Name
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Task Name"
                        id="taskName"
                        name="taskName"
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-lg sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="date" className="flex text-lg font-medium leading-6 dark:text-white text-gray-900 items-stretch">
                      Date
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Date"
                        id="date"
                        name="date"
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-lg sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="date" className="flex text-lg font-medium leading-6 dark:text-white text-gray-900 items-stretch">
                      Assign a user
                    </label>
                    <div className='mt-2'>
                    <select name='users' id='users' value={selectedUserEmail} onChange={handleUserChange} className="block w-full px-4 py-2 border rounded-lg mt-1">
                      {users.map((user, index) => (
                        <option key={index} value={user.email}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                    </div>
                  </div>
                </div>
                <label htmlFor="description" className="flex text-lg font-medium leading-6 dark:text-white text-gray-900 items-stretch">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    placeholder="Description of Task"
                    id="description"
                    name="description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-lg sm:text-sm sm:leading-6"
                  />
                </div>
                <button className="mt-4 bg-sky-300 hover:bg-cyan-200 text-white font-semibold px-6 py-3 rounded">
                {/* onClick={addTask} */}
                  Add
                </button>
              </form>
              <div class="aa de dn md aue avb bxo">
                <button type="button" class="adu alo axp bkx bmz bne bnq bog" onClick={closeModal}>
                  <span class="t">
                    ......
                  </span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="oc se">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
  )
 
}

export default Tasks;


