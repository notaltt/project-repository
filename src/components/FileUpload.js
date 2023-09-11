import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (file) {
      // Here, you can submit the 'file' to your backend or perform other actions
      console.log('File submitted:', file);
      // Reset the file state
      setFile(null);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        width: '300px',
        height: '200px',
        border: '2px dashed #ccc',
        borderRadius: '4px',
        textAlign: 'center',
        padding: '20px',
        cursor: 'pointer',
        margin: '20px auto',
      }}
    >
      {file ? (
        <div>
          <p>File selected: {file.name}</p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div>
          <p>Drag and drop a file here, or</p>
          <input
            type="file"
            accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
            onChange={handleFileInputChange}
          />
        </div>
      )}
    </div>
  );
}

export default FileUpload;
