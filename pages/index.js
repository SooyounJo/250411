import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import MainComponent from '../components/main';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const Model = () => {
  const mtl = useLoader(MTLLoader, '/re.mtl');
  const obj = useLoader(OBJLoader, '/re.obj', (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
  });

  return <primitive object={obj} position={[0, 0, 0]} />;
};

const AboutComponent = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default function Home() {
  return (
    <Layout title="Minimal Product Portfolio | Home">
      <MainComponent />
      <AboutComponent />
    </Layout>
  );
}
