import React, { useState, useEffect } from 'react';
import storage from './firebase';
import { ref, listAll, getDownloadURL, getMetadata} from "firebase/storage"
import {ReactComponent as Ellipsis} from '../images/ellipsis.svg';
import { type } from '@testing-library/user-event/dist/type';

export default function FileList(){
  const [listFile, setListFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ellipsisMenuVisible, setEllipsisMenuVisible] = useState(false);
  const [ellipsisMenuPosition, setEllipsisMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedFile, setSelectedFile] = useState(null);
  const ellipsisMenuContainer = document.getElementById('ellipsisMenuContainer');
  

  useEffect(() => {
    const listRef = ref(storage, 'team/sample/');

    setLoading(true);

    listAll(listRef)
    .then(async (res) => {
      const files = [];

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
  }, []);

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

  function humanFileSize(size){
    const i = size==0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
    );
  }

  function downloadFile(fileName){
    const storageRef = ref(storage, `team/sample/${fileName}`);
    getDownloadURL(storageRef).then((url) =>{
      window.open(url, '_blank');
    }).catch((error) =>{
      console.error('Error getting the url:', error);
    });

  }

  function fileTypeRename(typeName){
    if("application/vnd.openxmlformats-officedocument.wordprocessingml.document" === typeName){
      return "application/docx";
    }

    if("application/vnd.oasis.opendocument.text" === typeName){
      return "application/odt";
    }
    return typeName;
  }

  function handleEllipsisClick(event, file) {
    event.preventDefault();

    if(selectedFile === file){
      setEllipsisMenuPosition(false);
      setSelectedFile(null);
    } else {
      const ellipsisIcon = event.currentTarget;
      const ellipsisIconRect = ellipsisIcon.getBoundingClientRect();
      const top = ellipsisIconRect.bottom; 
      const left = ellipsisIconRect.left;
  
      const adjustleft = left - 110;
      
      setEllipsisMenuPosition({ top, left:  adjustleft});
      setSelectedFile(file);
      setEllipsisMenuVisible(true);
    }
  }
  
  return (
    <div className='dark:text-gray-200'>
      <div id='file-header' className='h-full w-full grid grid-cols-3 pl-4 pt-3 pb-3 border-b border-gray-300 bg-slate-700 dark:bg-black bg-opacity-60 text-white font-bold'>
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
        <p className='flex p-4'>Loading...</p>
      ) : (
        <ul>
          {listFile.length === 0 ? (
              <p className='flex'>No files available.</p>
            ) : (
              listFile.map((file) => (
                <div>
                  <div key={file.name} className='h-full w-full grid grid-cols-3 pl-4 pt-3 pb-3 border-b border-gray-300 dark:hover:bg-slate-800 hover:bg-gray-200 bg-opacity-70'>
                    <div className='flex'>
                      <h1>{file.name}</h1>
                    </div>
                    <div className='flex'>
                      <h1>{humanFileSize(file.size)}</h1>
                    </div>
                    <div className='flex justify-between'>
                      <h1>{fileTypeRename(file.type)}</h1>
                      <div className='cursor-pointer pr-10' onClick={(e) => handleEllipsisClick(e, file)}>
                        <Ellipsis/>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
        </ul>
        )}

        {ellipsisMenuVisible && selectedFile && (
          <div id="ellipsisMenuContainer" className="absolute items-center justify-center max-w-[150px]" style={{ top: ellipsisMenuPosition.top, left: ellipsisMenuPosition.left }}>
            <div className="bg-white border rounded shadow-md p-2">
              <ul>
                <li className="px-4 py-2 cursor-pointer" onClick={() => downloadFile(selectedFile.name)}>Download</li>
                <li className="px-4 py-2 cursor-pointer" >File Details</li>
                <li className="px-4 py-2 cursor-pointer" >Preview File</li>
              </ul>
            </div>
          </div>
        )}
    </div>
  )
}
