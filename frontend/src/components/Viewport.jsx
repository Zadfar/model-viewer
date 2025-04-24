import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import { useModelStore } from '../store/model';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.round(progress)}% loaded</Html>;
}

function Model({ url }) {

  const { scene } = useGLTF(url);

  return <primitive object={scene}/>;
}


const Viewport = () => {
    const { selectedModelId, models } = useModelStore();
    const modelData = models.find(model => model._id == selectedModelId)
    const modelUrl = modelData?.dataUrl;

    return (
        <div className='viewport'>
            <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1}/>
                <directionalLight position={[-10, -10, -5]} intensity={0.3} />

                <Suspense fallback={<Loader />}>
                    {modelUrl ? (
                        <Model url={modelUrl} />
                    ) : (null)}
                </Suspense>
                <OrbitControls />
                <Grid infiniteGrid position={[0, -0.1, 0]} />
            </Canvas>
        </div>
  );
}

export default Viewport;