import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress, Stage } from '@react-three/drei';
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
                          <Stage adjustCamera shadows={false} intensity={0.4}>
                          <mesh>
                          <Model url={modelUrl} />
                          </mesh>
                          </Stage>
                    ) : (null)}
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
  );
}

export default Viewport;