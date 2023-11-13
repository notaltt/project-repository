import { useState, useEffect } from "react";
import {ReactComponent as CloudIcon} from '../images/cloudicon.svg';
import storage from './firebase';
import { pushNotifications } from './notifications';
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../src/components/firebase';
import { firestore as db } from "./firebase";

export default function FileUpload({isVisible, company, team, path, uploadSuccess}){
  const [dragActive, setDragActive] = useState(null);
  const [file, setFile] = useState([]);
  const [percent, setPercent] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);
  const [userTeam, setUserTeam] = useState(team);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        if (!hasFetched) {
          getUser(user);
        }
      } else {
        console.log("User is not authenticated.");
      }
    });
  
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

  function handleChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFile((prevState) => [...prevState, e.target.files[i]]);
      }
    }
  }

  function handleSubmitFile(e) {
    if (file.length === 0) {
      alert("Please choose a file first!");
    } else {
      const promises = file.map((selectedFile) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, path + `/${selectedFile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(percent);
            },
            (err) => {
              reject(err);
            },
            () => {
              resolve(selectedFile.name);
            }
          );
        });
      });
  
      Promise.all(promises)
        .then((fileNames) => {

          if (uploadSuccess){
            uploadSuccess();
          }
          
          setUploadedFileNames(fileNames);
          setFile([]);
          const notificationContent = "Added " + fileNames.join(", ");
          const notificationData = {
            time: new Date(),
            type: "Uploaded files",
            content: notificationContent,
          };
          pushNotifications(userTeam, userAvatar, userName, userRole, notificationData.time, notificationData.type, notificationData.content);
        })
        .catch((error) => {
          console.error("Error while uploading files: " + error);
        });
    }
  }
  
  

  const uploading = uploadProgress > 0 && uploadProgress < 100;
  
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFile((prevState) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName, i) {
    const newArr = [...file];
    newArr.splice(i, 1);
    setFile([]);
    setFile(newArr);
  }

  function humanFileSize(size){
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
    );
  }

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  }
  

  return (
    <div className="relative">
      <div className="bg-white absolute right-0 z-50">
        <div className={`max-h-[auto] w-[600px] overflow-y-auto p-4 border border-gray-300 transition-opacity duration-300 ${isVisible ? 'w-[600px]' : 'hidden'}`}>
        <label for="dropzone-file" className={`${dragActive ? "bg-blue-100 border-blue-500":"bg-blue-50 border-blue-100"} w-full p-4 grid place-content-center cursor-pointer text-blue-500 rounded-lg
          border-4 border-dashed transition-colors`}
          onDragEnter = {handleDragEnter}
          onSubmit = {(e) => e.preventDefault()}
          onDrop = {handleDrop}
          onDragLeave = {handleDragLeave}
          onDragOver = {handleDragOver}>
          <div className="flex flex-col items-center">
            <span className="text-blue-500">
              <CloudIcon stroke="currentColor" />
            </span>
            <p><span className="font-semibold">Click to select file</span> or drag and drop</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleChange} multiple/>

          <div className="flex gap-2 mt-3 justify-center items-center">
            <button id="upload-button"className="bg-blue-500 text-blue-50 px-2 py-1 rounded-md" onClick={handleSubmitFile} 
            >{uploading ? `Uploading: ${uploadProgress.toFixed(2)}%` : "Upload"}</button>
            <button className = "border border-blue-500 px-2 py-1 rounded-md" onClick = {() => setFile([])}>Clear</button>
          </div>
        </label>

        <div className="grid grid-cols-3 mt-2">
            {file.map((file, i) => (
              <div key={i} className="bg-white rounded-lg max-w-150 max-h-150 shadow-md mx-auto mt-2">
              <div className="text-center p-6">
                <p className="w-32 overflow-hidden font-semibold">{truncateText(file.name, 10)}</p>
                <p className="text-gray-600">{humanFileSize(file.size)}</p>
              </div>
              <div className="" onClick={() => removeFile(file.name, i)}>
                <p className="border-t cursor-pointer border-gray-300 bg-gray-100 p-3 text-center rounded hover:text-white hover:bg-blue-500 hover:border-white transition-colors"
                  onClick={() => removeFile(file.name, i)}>REMOVE</p>
              </div>
            </div>
            ))}
          </div>
      </div>
    </div>
    </div>
  )
}
