import React, { useState, useEffect } from 'react';
import storage from './firebase';
import { ref, listAll, getDownloadURL, getMetadata} from "firebase/storage"
import {ReactComponent as Ellipsis} from '../images/ellipsis.svg';

export default function FileList(){
  const [listFile, setListFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });


  useEffect(() => {
    const listRef = ref(storage, 'team/sample/');

    setLoading(true);

    function handleLeftClick(event){
      if(event.button == 0){
        setContextMenuVisible(false);
      }
    }

    document.addEventListener('mousedown', handleLeftClick);

    listAll(listRef)
    .then(async (res) => {
      const files = [];

      for (const itemRef of res.items) {
        const downloadURL = await getDownloadURL(itemRef);
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

    return() => {
      document.removeEventListener('mousedown', handleLeftClick);
    };
  }, []);

  function humanFileSize(size){
    const i = Math.floor(Math.log(size) / Math.log(1024));
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

  //right click events should be made here
  // function handleRightClickEvent(e, file){
  //   e.preventDefault();
  //   setContextMenuPosition({ top: e.clientY, left: e.clientX });
  //   setContextMenuVisible(true);
  // }



  //for ellipsis events
  function handleEllipsis(){

  }

  return (
    <div>
      <div id='file-header' className='h-full w-full grid grid-cols-3 pl-2 pt-3 border-b border-gray-300'>
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
        <p className='flex'>Loading...</p>
      ) : (
        <ul>
          {listFile.length === 0 ? (
              <p className='flex'>No files available.</p>
            ) : (
              listFile.map((file) => (
                <div>
                  <div key={file.name} className='h-full w-full grid grid-cols-3 pl-2 pt-3 pb-3 border-b border-gray-300 hover:bg-gray-200'>
                    <div className='flex'>
                      <h1>{file.name}</h1>
                    </div>
                    <div className='flex'>
                      <h1>{humanFileSize(file.size)}</h1>
                    </div>
                    <div className='flex justify-between'>
                      <h1>{file.type}</h1>
                      <div className='cursor-pointer pr-10' onClick={() => downloadFile(file.name)}>
                        <Ellipsis/>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
        </ul>
        )}

        {/* {contextMenuVisible && (
          <div className='bg-gray-100 text-black p-2 absolute' style={{ top: contextMenuPosition.top, left: contextMenuPosition.left }}>
            <h1 className='cursor-pointer' onClick={() => downloadFile(file)}>Download</h1>
          </div>
        )} */}
    </div>
  )
}