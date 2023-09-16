import { useState, useEffect } from "react";
import {ReactComponent as CloudIcon} from '../images/cloudicon.svg';
import storage from './firebase';
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"


export default function FileUpload({isVisible, height}){
  const [dragActive, setDragActive] = useState(null);
  const [file, setFile] = useState([]);
  const [percent, setPercent] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      file.forEach((selectedFile) => {
        const storageRef = ref(storage, `/team/sample/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(percent);
          },
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
            });

            setFile((prevState) => prevState.filter((f) => f !== selectedFile));
          }
        );
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
      <div className="absolute right-0 z-50">
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
          <input id="dropzone-file" type="file" class="hidden" onChange={handleChange} multiple/>

          <div className="flex gap-2 mt-3 justify-center items-center">
            <button id="upload-button"className="bg-blue-500 text-blue-50 px-2 py-1 rounded-md" onClick={handleSubmitFile} 
            >{uploading ? `Uploading: ${uploadProgress.toFixed(2)}%` : "Upload"}</button>
            <button className = "border border-blue-500 px-2 py-1 rounded-md" onClick = {() => setFile([])}>Clear</button>
          </div>
        </label>

        <div className="grid grid-cols-3 mt-2">
            {file.map((file, i) => (
              <div key={i} class="bg-white rounded-lg max-w-150 max-h-150 shadow-md mx-auto mt-2">
              <div class="text-center p-6">
                <p className="w-32 overflow-hidden font-semibold">{truncateText(file.name, 10)}</p>
                <p class="text-gray-600">{humanFileSize(file.size)}</p>
              </div>
              <div class="" onClick={() => removeFile(file.name, i)}>
                <p class="border-t cursor-pointer border-gray-300 bg-gray-100 p-3 text-center rounded hover:text-white hover:bg-blue-500 hover:border-white transition-colors"
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
