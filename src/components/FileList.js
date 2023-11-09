import React, { useState, useEffect } from 'react';
import storage from './firebase';
import { ref, listAll, getDownloadURL, getMetadata, uploadString, deleteObject} from "firebase/storage"
import {ReactComponent as Ellipsis} from '../images/ellipsis.svg';
import { pushNotifications } from './notifications';
import { collection, getDocs, where, query, doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../src/components/firebase';
import { firestore as db } from "./firebase";
import {ReactComponent as CloudIcon} from '../images/cloudicon.svg';
import { ReactComponent as PlusIcon } from '../images/plus.svg';
import FileUpload from './FileUpload';

const FileList = ({ company, team }) => {
  const [listFile, setListFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ellipsisMenuVisible, setEllipsisMenuVisible] = useState(false);
  const [ellipsisMenuPosition, setEllipsisMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedFile, setSelectedFile] = useState(null);
  const ellipsisMenuContainer = document.getElementById('ellipsisMenuContainer');
  const [showFileDetail, setShowFileDetail] = useState(false);
  const [view, setView] = useState(true);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [folderCreate, setFolderCreate] = useState(false);
  const [folderName, setFolderName] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [userTeam, setUserTeam] = useState(team);
  const [currentFolder, setCurrentFolder] = useState([`company/${company}/${team}`]);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const path = currentFolder.join('/') || '';
  const [fileUploadActive, setFileUploadActive] = useState(false);

  const storageRef = ref(storage, path);

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

  useEffect(() => {
    const listRef = ref(storage, path);
  
    listAll(listRef)
      .then(async (res) => {
        const files = [];
  
        for (const prefixRef of res.prefixes) {
          files.push({
            name: prefixRef.name,
            isFolder: true,
          });
        }
  
        for (const itemRef of res.items) {
          const metadata = await getMetadata(itemRef);
          files.push({
            name: itemRef.name,
            size: metadata.size,
            type: metadata.contentType,
          });
        }
  
        setListFile(files);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [path]);
  
  const fetchUpdatedList = () => {
    const listRef = ref(storage, path);
  
    listAll(listRef)
      .then(async (res) => {
        const files = [];
  
        for (const prefixRef of res.prefixes) {
          files.push({
            name: prefixRef.name,
            isFolder: true,
          });
        }
  
        for (const itemRef of res.items) {
          const metadata = await getMetadata(itemRef);
          files.push({
            name: itemRef.name,
            size: metadata.size,
            type: metadata.contentType,
          });
        }
  
        setListFile(files);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };  

  useEffect(() =>{
    function handleClickEvent(event){
      if(ellipsisMenuContainer && !ellipsisMenuContainer.contains(event.target)){
        setEllipsisMenuVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickEvent);

    return () => {
      document.removeEventListener('mousedown', handleClickEvent)
    }
  }, []);

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

  function toggleFileDetailModal() {
    setShowFileDetail(prev => !prev);
  }

  function humanFileSize(size){
    const i = size===0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));

    if("NaN undefined" === size){
      return "0 B"
    }

    return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
    );
  }

  function downloadFile(fileName) {
    const storageRef = ref(storage, `team/sample/${fileName}`);
  
    getDownloadURL(storageRef)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
  
        xhr.onload = () => {
          if (xhr.status === 200) {
            const blob = xhr.response;
  
            const objectURL = URL.createObjectURL(blob);
  
            const a = document.createElement('a');
            a.href = objectURL;
            a.download = fileName;
            a.style.display = 'none';
  
            document.body.appendChild(a);
            a.click();
  
            document.body.removeChild(a);
            URL.revokeObjectURL(objectURL);
          }
        };
  
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((error) => {
        console.error('Error getting the URL:', error);
      });
  }
  
  
  

  function fileTypeRename(typeName){
    if("application/vnd.openxmlformats-officedocument.wordprocessingml.document" === typeName){
      return "application/docx";
    }

    if("application/vnd.oasis.opendocument.text" === typeName){
      return "application/odt";
    }

    if("" === typeName){
      return "type/folder"
    }

    return typeName;
  }

  function handleEllipsisClick(event, file) {
    event.preventDefault();
  
    if (selectedFile === file) {
      setEllipsisMenuPosition(null);
      setSelectedFile(null);
    } else {
      const ellipsisIcon = event.currentTarget;
      const ellipsisIconRect = ellipsisIcon.getBoundingClientRect();
  
      // Adjust the top and left based on the icon's position
      const top = event.clientY - 90; // Adjust this value if needed
      const left = event.clientX - 330; // Adjust this value if needed
  
      setEllipsisMenuPosition({ top, left });
      setSelectedFile(file);
      setEllipsisMenuVisible(true);
    }
  }
  

  function onViewClick(file){
    setView(!view);
    const storageRef = ref(storage, `team/sample/${file.name}`);
    getDownloadURL(storageRef).then((url) =>{
      console.log(url);
      setUrl(url);
    }).catch((error) =>{
      console.error('Error getting the url:', error);
    });

    setFile(file);
  }

  function closeView(){
    setView(!view);
  }

  async function createFolder(currentRef, folderName) {
    const newDir = ref(currentRef, folderName);

    const notificationData = {
      time: new Date(),
      type: "folder",
      content: "created "+ folderName +" folder"
    }
    
    try {
      const readmeFile = ref(newDir, 'readme.txt');
      await uploadString(readmeFile, '');
      
      pushNotifications(userTeam, userAvatar, userName, userRole, notificationData.time, notificationData.type, notificationData.content);

      console.log(`Folder '${folderName}' created.`);
      fetchUpdatedList();
      setFolderCreate(false);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }

  function handleFolderClicks(folderName) {
    const newFolder = [...currentFolder, folderName];
    setCurrentFolder(newFolder);
  }  

  function goBack() {
    if (currentFolder.length > 1) {
      const newFolder = [...currentFolder];
      newFolder.pop();
      setCurrentFolder(newFolder);
    }
  }

  function openFolderMenu(){
    setFolderCreate(true);
    setEllipsisMenuVisible(false);
  }

  function closeFolderMenu(){
    setFolderCreate(false);
  }

  function deleteConfirmation(){
    setDeleteMenu(true);
    setEllipsisMenuVisible(false);
  }

  function closeDelete(){
    setDeleteMenu(false);
  }

  function deleteFile(fileName){
    const storageRef = ref(storage, path + `/${fileName}`);

    const notificationData = {
      time: new Date(),
      type: "file",
      content: "deleted "+ fileName
    }

    deleteObject(storageRef)
      .then(() => {
        console.log(`File ${fileName} deleted successfully.`);
        fetchUpdatedList();

        pushNotifications(userTeam, userAvatar, userName, userRole, notificationData.time, notificationData.type, notificationData.content);

        setDeleteMenu(false);
      })
      .catch((error) => {
        console.error(`Error deleting file ${fileName}: ${error.message}`);
      });
  }

  const toggleFileUpload = () => {
    setFileUploadActive(!fileUploadActive);
  };

  const renamePath = (path) => {
    const segments = path.split('/');
    if (segments.length >= 3) {
      return `... ${'>'} ${segments.slice(2).join(' > ')}`;
    } else {
      return path;
    }
  };

  
  return (
  <>
  <button onClick={toggleFileUpload} title="Upload" class="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl">
    <span className="text-white">
        <CloudIcon stroke="currentColor" />
    </span>
  </button>

  <FileUpload isVisible={fileUploadActive} company={company} team={team} path={path} uploadSuccess={fetchUpdatedList}/>

  {view ?  <div className='p-5 bg-slate-50 rounded-lg drop-shadow-lg m-5'>
      <div className='flex items-center'>
          <button className='flex items-center justify-center bg-blue-500 p-3 text-white rounded' onClick={() => openFolderMenu()}>
            <div>
              <PlusIcon/>
            </div>
            Create Folder
          </button>
          <h1 className='ml-4 text-left cursor-pointer' onClick={() => goBack()}>{renamePath(path)}</h1>
      </div>
      <div id='file-header' className='h-full w-full grid grid-cols-3 pl-2 pt-3 pb-2 border-b border-gray-300'>
        <div className='flex'>
          <h1>Name</h1>
        </div>
        <div className='flex'>
          <h1>Size</h1>
        </div>
        <div className='flex'>
          <h1>Type</h1>
        </div>
      </div>
      {loading ? (
        <p className='flex'>LOADING...</p>
      ) : (
        <ul>
          {listFile.length === 0 ? (
              <p className='flex'>Loading...</p>
            ) : (
              listFile.map((prefix, index) => (
                <div>
                  <div key={index}>
                    {prefix.isFolder ? (
                      <div className='h-full w-full grid grid-cols-3 pl-2 pt-3 pb-3 cursor-pointer border-b border-gray-300 hover:bg-slate-100 transition duration-300 ease-in-out' onClick={() => handleFolderClicks(prefix.name)}>
                        <div className='flex'> 
                          {prefix.name} 
                        </div>
                        <div className='flex'>
                          -
                        </div>
                        <div className='flex'>
                          folder
                        </div>
                      </div>
                    ):(
                      <div className='h-full w-full grid grid-cols-3 pl-2 pt-3 pb-3 border-b border-gray-300 hover:bg-slate-100 transition duration-300 ease-in-out'>
                        <div className='flex'>
                          <h1>{prefix.name}</h1>
                        </div>
                        <div className='flex'>
                          <h1>{humanFileSize(prefix.size)}</h1>
                        </div>
                        <div className='flex justify-between'>
                          <h1>{fileTypeRename(prefix.type)}</h1>
                          <div className='cursor-pointer pr-10' onClick={(e) => handleEllipsisClick(e, prefix)}>
                            <Ellipsis/>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
        </ul>
        )}

        {showFileDetail && selectedFile && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {selectedFile.name}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowFileDetail(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      File type: {fileTypeRename(selectedFile.type)} <br/>
                      File size: {humanFileSize(selectedFile.size)} <br/>
                      Modified by: <br/>
                      Last Modified: <br/>
                      {/* Additional information */}
                    </p>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowFileDetail(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowFileDetail(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}

        {ellipsisMenuVisible && selectedFile && (
          <div className="fixed top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ top: ellipsisMenuPosition.top, left: ellipsisMenuPosition.left }}>
            <div className="bg-white border rounded shadow-md p-2">
              <ul>
                <li className="px-4 py-2 cursor-pointer" onClick={() => {downloadFile(selectedFile.name);}}>Download</li>
                <li className="px-4 py-2 cursor-pointer" onClick={() => deleteConfirmation()}>Delete</li>
                <li className="px-4 py-2 cursor-pointer" onClick={() => setShowFileDetail(true)}>File Details</li>
                <li className="px-4 py-2 cursor-pointer" onClick={() => onViewClick(selectedFile)}>Preview File</li>
              </ul>
            </div>
          </div>
        )}

        {deleteMenu && selectedFile && (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-30'>
            <div className='bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md'>
              <h2 className='text-lg font-semibold mb-4'>Are you sure deleting {selectedFile.name}?</h2>
              <button className='bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600' onClick={() => deleteFile(selectedFile.name)}>Yes</button>
              <button className='bg-gray-300 text-gray-700 py-2 px-4 rounded hover-bg-gray-400' onClick={() => closeDelete()}>Cancel</button>
            </div>
          </div>
        )}

        {folderCreate && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-4">Create a Folder</h2>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2 mb-2"
                placeholder="Folder Name"
                value={folderName || ''}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <div className="flex justify-center items-center">
                <button
                  onClick={() => createFolder(storageRef, folderName)}
                  className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
                >
                  Create
                </button>
                <button
                  onClick={closeFolderMenu}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover-bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
    :
    <>
    {
      file && file.type == "image/jpeg" || file.type == "image/png" ? 
      <div>
        <h1>{file.name}</h1>
        <a href={file.url}>
          <img src={url} />
        </a>
        
      </div>
      : 
      <div>
        {/*  */}
      </div>

    }
    {
      file && file.type == "application/pdf" ? 
      <div>
        <h1>{file.name}</h1>
        <embed type="application/pdf" src={url} width={100+'%'} height={700}></embed>
        

      </div> 
      : 
      <div>
        {/*  */}
      </div>

    }
    {
      file && file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type == "application/vnd.oasis.opendocument.text" ? 
      <div>
        <h1>{file.name}</h1>
        Unable to preview, file downloaded automatically to view.
        {window.open(url, '_blank')}

      </div> 
      : 
      <div>
        {/*  */}
      </div>

    }
    {
      file && file.type == "video/webm" ? 
      <div>
        <h1>{file.name}</h1>
        <video src={url} controls />

      </div> 
      : 
      <div>
        {/*  */}
      </div>

    }
    {
      file && file.type == "audio/wav" ? 
      <div>
        <h1>{file.name}</h1>
        <video src={url} controls />

      </div> 
      : 
      <div>
        {/*  */}
      </div>

    }
    {
      file && file.type == "application/docx" || file.type == "application/msword" || file.type == "application/odt" ? 
      <div>
        <h1>{file.name}</h1>
        Unable to preview, file downloaded automatically to view.
        {window.open(url, '_blank')}

      </div> 
      : 
      <div>
        {/*  */}
      </div>

    }
    {
      file && file.type == "application/x-zip-compressed" || file.type == "application/epub+zip" ? 
      <div>
        <h1>{file.name}</h1>
        Unable to preview, file downloaded automatically to view.
        {window.open(url, '_blank')}

      </div> 
      : 
      <div>
        {/*  */}
      </div>

    }
    <button className="px-4 py-2 cursor-pointer" onClick={closeView}>Go back</button>
    </>
  }
  </>
  )
}

export default FileList;