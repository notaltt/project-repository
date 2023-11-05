import React, { useState, useEffect } from 'react';
import { firestore as db } from "../components/firebase.js"; 
import { collection, getDocs, where, query, doc, getDoc } from 'firebase/firestore';

function TeamSelector({ onTeamSelect, user }) { // Assume that a user prop is passed to this component
  const [teams, setTeams] = useState([]);

  const fetchTeamsForUser = async () => {
    const teamNames = []; // This will store the team objects with id and name
    try {
      if (user && user.uid) { // Ensure user object exists and has uid
        console.log(`Fetching teams for user ID: ${user.uid}`); // Log user ID
        const userRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);
  
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          console.log('User data retrieved:', userData); // Log retrieved user data
          const userTeams = userData.teams || [];
  
          if (userTeams.length === 0) {
            console.log('User is not part of any teams.'); // Log empty teams array
          } else {
            const teamRef = collection(db, 'teams');
            const teamQuery = query(teamRef, where('teamName', 'in', userTeams));
            const teamSnapshot = await getDocs(teamQuery);
  
            if (teamSnapshot.empty) {
              console.log('No teams found with the given team names.'); // Log empty query result
            } else {
              teamSnapshot.forEach((doc) => {
                teamNames.push({
                  id: doc.id,
                  name: doc.data().teamName // Make sure 'teamName' corresponds to your field
                });
                console.log(`Team found: ${doc.data().teamName}`); // Log each found team
              });
            }
          }
          setTeams(teamNames); // Update state with fetched teams
        } else {
          console.log('User snapshot does not exist.'); // Log if user snapshot doesn't exist
        }
      } else {
        console.log('Invalid user object provided:', user); // Log if user is undefined or lacks UID
      }
    } catch (error) {
      console.error("Error fetching teams for user:", error);
    }
  };

  useEffect(() => {
    fetchTeamsForUser(); // Fetch teams when component mounts or user changes
  }, [user]); // Adding user to dependency array so it re-runs when user changes

  const handleChange = (event) => {
    onTeamSelect(event.target.value);
  };

  return (
    <select
      className="w-full pl-8 pr-2 text-large dark:text-black text-black placeholder-blue-600 bg-gray-200 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-blue dark:focus:placeholder-gray-600 
      dark:bg-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-red-300 focus:outline-none focus:shadow-outline-purple focus:text-blue-500 form-input"
      aria-label="Choose Team"
      defaultValue=""
      onChange={handleChange}
    >
      <option value="" disabled hidden>
        Choose Team
      </option>
      {teams.map((team) => (
        <option key={team.id} value={team.id}>
          {team.name}
        </option>
      ))}
    </select>
  );
}

export default TeamSelector;
