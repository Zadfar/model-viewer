import React from 'react'
import { useModelStore } from '../store/model';

const AnimationList = () => {
    const {animationArray, setAnimationArray, selectedAnimation, setSelectedAnimation} = useModelStore();

    return (
    <div className='model-list'>
        <select name="Animations" id="animations" onChange={(e) => {
            const c = e.target.value;
            setSelectedAnimation(c);
        }}>
        <option value="">-- None --</option>
        {animationArray.map((animation) => {
                return (
                    <option key={animation.name} value={animation.name}>{animation.name}</option>
                );
            })}
        </select>
    </div>
    )
}

export default AnimationList