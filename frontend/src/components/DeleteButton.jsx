import React, {useState} from 'react';
import axios from 'axios';
import { useModelStore } from '../store/model';
import {BeatLoader} from 'react-spinners';

const DeleteButton = () => {
    const { selectedModelId, removeModel } = useModelStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        const modelToDelete = useModelStore.getState().models.find(m => m._id === selectedModelId);
        const modelName = modelToDelete ? modelToDelete.dataName : 'the selected model';

        if (!window.confirm(`Are you sure you want to delete "${modelName}"? This action cannot be undone.`)) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.delete(`/api/models/${selectedModelId}`)
            if(response.data.success) {
                alert(`Model "${modelName}" deleted successfully!`);
                removeModel(selectedModelId);
            }
        } catch (error) {
            console.error('Deletion failed:', error.response ? error.response.data : error.message);
            alert(`Deletion failed: ${error.response?.data?.message || 'Server error or network issue'}`);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='divider'>
            <button className='delete-button' onClick={handleDelete} disabled={!selectedModelId || isLoading}>Delete Model</button>
            <BeatLoader loading={isLoading} size={50} color='#007bff' className='loader' />
        </div>
    )
};

export default DeleteButton;