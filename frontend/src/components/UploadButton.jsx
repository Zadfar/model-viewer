import React, { useState } from 'react';
import UploadModal from './UploadModal';
import axios from 'axios';
import {BeatLoader} from 'react-spinners';
import {useModelStore} from '../store/model'
import toast, { Toaster } from 'react-hot-toast';

const UploadButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const addModel = useModelStore((state) => state.addModel);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUploadSubmit = async (name, file) => {
        console.log('Submitting:', { name, file });

        if (!file) {
            toast.error('No file selected!');
            return;
        }

        const formData = new FormData();
        formData.append('dataName', name);
        formData.append('modelFile', file);

        setIsLoading(true);
        try {
            const response = await axios.post('https://model-viewer-backend.onrender.com/api/models/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(`"${response.data.data.dataName}" uploaded successfully!`);
            setIsLoading(false);

            if (response.data.success && response.data.data) {
                addModel(response.data.data);
            }
            handleCloseModal();

        } catch (error) {
            toast.error(`Upload failed: 'Server error'`);
            setIsLoading(false);
        }
    };

    return (
        <div className='divider'>
            <button className='upload-button' onClick={handleOpenModal}>
                Upload .glb file
            </button>
            <UploadModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleUploadSubmit}
                isLoading={isLoading}
            />
            <BeatLoader loading={isLoading} size={50} color='#007bff' className='loader' />
            <Toaster />
        </div>
    );
};

export default UploadButton;