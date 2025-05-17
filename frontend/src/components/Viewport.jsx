import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress, Stage, Grid } from '@react-three/drei';
import { useModelStore } from '../store/model';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.round(progress)}% loaded</Html>;
}

function Model({ url }) {
  const {useAnimation, setAnimationArray, animationArray, selectedAnimation} = useModelStore();
  const { scene, animations } = useGLTF(url);
  const modelRef = useRef();
  const mixerRef = useRef();
  const actionsRef = useRef({});
  const [currentAction, setCurrentAction] = useState(null);
  useEffect(() => {
    if (modelRef.current && animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(modelRef.current);
      actionsRef.current = {};

      animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        actionsRef.current[clip.name] = action;
        action.setLoop(THREE.LoopRepeat);
        action.clampWhenFinished = true;
      });

      setAnimationArray(animations);

      const animationName = selectedAnimation;
      if (animationName && useAnimation) {
        const actionToPlay = actionsRef.current[animationName];
        if (actionToPlay) {
          actionToPlay.reset().play();
          setCurrentAction(actionToPlay);
        }
      }

      return () => mixerRef.current?.stopAllAction();
    } else {
        mixerRef.current?.stopAllAction();
        actionsRef.current = {};
        setCurrentAction(null);
    }
  }, [animations, useAnimation, selectedAnimation]);
  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
      <group ref={modelRef}>
         <primitive object={scene} />
      </group>
  );
}


const Viewport = () => {
    const { selectedModelId, models, useGrid } = useModelStore();
    const modelData = models.find(model => model._id == selectedModelId)
    const modelUrl = modelData?.dataUrl;

    return (
        <div className='viewport'>
            <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <Suspense fallback={<Loader />}>
                    {modelUrl ? (
                          <Stage adjustCamera={1.3} shadows={false} intensity={0.4} environment="city">
                          <mesh>
                          <Model url={modelUrl} />
                          </mesh>
                          </Stage>
                    ) : (null)}
                </Suspense>
                <OrbitControls />
                {(useGrid) ? <Grid infiniteGrid /> : null}
            </Canvas>
        </div>
  );
}

export default Viewport;