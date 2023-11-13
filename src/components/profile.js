import React, { useState, useEffect } from 'react';
import Profile from './Profile-Menu';
import AvatarUpload from './AvatarUpload';
import { UserAuth } from '../context/AuthContext';
import { updateUserDataByUid, getUserDataByUid } from './userDataUtils';
import DarkMode from './DarkMode';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const UpdateProfileForm = () => {
  const { user } = UserAuth();
  const [name, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    if (user && user.uid) {
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', user.uid);

      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setDisplayName(user.name);
      setPhone(user.phone);
      setUsername(user.username);
    }
    fetchUserData();
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await getUserDataByUid(user.uid);

      if (userData) {
        await updateUserDataByUid(user.uid, {
          name: name,
          phone: phone,
          username: username,
        });
        alert('Profile updated successfully!');
        setIsEditing(false);
        fetchUserData();
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
      alert('An error occurred while updating profile.');
    }
  };

  return (
    <>
    <div className="flex">
        <div>
            <header>    
              <div>
                <Profile/> 
              </div> 
              <div className='hidden'>
                  <DarkMode/>
              </div>
            </header>
        </div>
        <aside className="dark:bg-gray-900  bg-gray-100 relative w-1/4">
              <div className='absolute top-64 inset-0'>
              <AvatarUpload />
              </div>
        </aside>
         
        <main className="w-3/4"> 
          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 bg-gray-100 h-screen ">
            <div className="ml-40 mr-50 dark:text-white dark:bg-gray-900 bg-gray-100 rounded-lg ">
              <div className='flex flex-row'>
                <div className='mr-40'>
                {userData && (
                  <div className="bg-gray-100 dark:bg-gray-900 dark:text-white p-4 rounded-md">
                    <p className="text-3xl font-semibold mb-2">User Information</p>
                    <div className='mt-4'>
                        <p className="text-2xl dark:text-gray-200 text-black font-semibold capitalize">{userData.name}</p>
                        <p className="text-black dark:text-gray-200">{userData.email}</p>
                    </div>
                    <hr className="my-4 border-gray-200" />
                    <div>
                      <p className="flex flex-col dark:text-gray-200 text-black">
                        <span className="text-lg font-semibold">Company</span> {userData.company}
                      </p>
                      <p className="text-black dark:text-gray-200">
                        <span className="font-semibold">Phone:</span> {userData.phone}
                      </p>
                      {/* Add more fields based on your user data structure */}
                    </div>
                    <div>
                      {userData && !isEditing && (
                        <div className="bg-gray-100 dark:text-white dark:bg-gray-900 p-4 rounded-md">
                          <button
                            onClick={() => setIsEditing(true)}
                            className="w-40 py-3 hover:dark:bg-purple-300 dark:bg-purple-500 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
                          >
                            Edit Profile
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                    )}
                </div>
                
                <div>
                {isEditing && (
                <form className="dark:bg-gray-900 dark:text-white py-3 space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="name" className="dark:text-white text-gray-700 font-semibold">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      placeholder="Name"
                      required
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full p-3 dark:text-black  border border-gray-300 rounded-lg focus:ring focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="text-gray-700 dark:text-white font-semibold">Username</label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      required
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 dark:text-black border border-gray-300 rounded-lg focus:ring focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-gray-700 dark:text-white font-semibold">Phone Number</label>
                    <input
                      id="phone"
                      type="text"
                      value={phone}
                      placeholder="Phone Number"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 dark:text-black border border-gray-300 rounded-lg focus:ring focus:ring-indigo-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 hover:dark:bg-purple-300 dark:bg-purple-500 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-400"
                  >
                    Save Changes
                  </button>
                </form>
              )}
                </div>
              </div>

              
            </div>
      </div>
        </main>
  </div>
  </>
  );
};

export default UpdateProfileForm;
