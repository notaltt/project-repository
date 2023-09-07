import React, { useState, useEffect } from "react";

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fileRef = firebase.database().ref("files");
    fileRef.on("value", (snapshot) => {
      const fileData = snapshot.val();
      if (fileData) {
        const fileArray = Object.keys(fileData).map((key) => ({
          id: key,
          ...fileData[key],
        }));
        setFiles(fileArray);
      } else {
        setFiles([]);
      }
    });
  }, []);

  return (
    <div>
      <h2>File List</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} - {file.size} bytes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;