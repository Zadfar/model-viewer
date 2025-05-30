import React, { useEffect } from 'react'
import { useModelStore } from '../store/model'

const ModelList = () => {
    const {fetchModels, models, selectedModelId, setSelectedModelId} = useModelStore();
    useEffect(() => {
        fetchModels();
    }, [fetchModels])

    return (
        <div className='model-list'>
            <select name="Models" id="models" onChange={(e) => {
                const c = e.target.value;
                setSelectedModelId(c);
            }}>
            <option value="">-- None --</option>
            {models.map((model) => {
                    return (
                        <option key={model._id} value={model._id}>{model.dataName}</option>
                    );
                })}
            </select>
        </div>
    )
}

export default ModelList;