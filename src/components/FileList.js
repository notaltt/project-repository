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
  const [showFileDetail, setShowFileDetail] = useState(false);

  

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

  function toggleFileDetailModal() {
    setShowFileDetail(prev => !prev);
  }

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

    if("application/vnd.oasis.opendocument.text" == typeName){
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
                      File type: {fileTypeRename(selectedFile.type)} <br />
                      File size: {humanFileSize(selectedFile.size)} <br />
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
          <div className="absolute items-center justify-center max-w-[150px]" style={{ top: ellipsisMenuPosition.top, left: ellipsisMenuPosition.left }}>
            <div className="bg-white border rounded shadow-md p-2">
              <ul>
                <li className="px-4 py-2 cursor-pointer" 
                    onClick={() => {
                      console.log('Download button clicked'); // <-- log here
                      downloadFile(selectedFile.name);
                    }}>
                  Download
                </li>
                <li className="px-4 py-2 cursor-pointer" onClick={() => setShowFileDetail(true)}>File Details</li>
                <li className="px-4 py-2 cursor-pointer" >Preview File</li>
              </ul>
            </div>
          </div>
        )}
    </div>
  )
}
