import React, { useState, useEffect } from 'react';

const UploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [modelName, setModelName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileNameDisplay, setFileNameDisplay] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setModelName('');
      setSelectedFile(null);
      setFileNameDisplay('');
    }
  }, [isOpen]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileNameDisplay(file.name);
    } else {
      setSelectedFile(null);
      setFileNameDisplay('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!modelName || !selectedFile) {
      alert('Please provide a model name and select a GLB file.');
      return;
    }

    onSubmit(modelName, selectedFile);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Upload 3D Model</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label htmlFor="modelName">Model Name:</label>
            <input
              type="text"
              id="modelName"
              className="modal-input"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              required
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="modelFile">GLB File (.glb):</label>
            <input
              type="file"
              id="modelFile"
              className="modal-file-input"
              accept=".glb"
              onChange={handleFileChange}
              required
            />
            {fileNameDisplay && <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#555' }}>Selected: {fileNameDisplay}</p>}
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-button close" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-button submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;