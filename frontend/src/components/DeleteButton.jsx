import React, {useState} from 'react';
import axios from 'axios';
import { useModelStore } from '../store/model';
import {BeatLoader} from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';

const DeleteButton = () => {
    const { selectedModelId, removeModel } = useModelStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        const modelToDelete = useModelStore.getState().models.find(m => m._id === selectedModelId);
        const modelName = modelToDelete ? modelToDelete.dataName : 'the selected model';

        if (!window.confirm(`Are you sure you want to delete "${modelName}"?`)) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.delete(`https://model-viewer-backend.onrender.com/api/models/${selectedModelId}`)
            if(response.data.success) {
                toast.success(`Model "${modelName}" deleted successfully!`);
                removeModel(selectedModelId);
            }
        } catch (error) {
            toast.error(`Deletion failed: ${error.response?.data?.message || 'Server error or network issue'}`);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='divider'>
            <button className='delete-button' onClick={handleDelete} disabled={!selectedModelId || isLoading}>Delete Model</button>
            <BeatLoader loading={isLoading} size={50} color='#007bff' className='loader' />
            <Toaster />
        </div>
    )
};

export default DeleteButton;