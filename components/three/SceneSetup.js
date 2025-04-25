import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment,
  Grid,
  useDetectGPU
} from '@react-three/drei';
import * as THREE from 'three';
import RecodeModel from '../RecodeModel';
import AxisHelper from './AxisHelper';
import CoordinateTracker from './CoordinateTracker';
import Loader from './Loader';

// 카메라 위치 제한 컴포넌트
function CameraPositionLimit() {
  const { camera } = useThree();
  
  useFrame(() => {
    // x축 이동 제한
    if (camera.position.x > 20) camera.position.x = 20;
    if (camera.position.x < -20) camera.position.x = -20;
    
    // y축 이동 제한 (너무 낮거나 높지 않게)
    if (camera.position.y < 1) camera.position.y = 1;
    if (camera.position.y > 20) camera.position.y = 20;
    
    // z축 이동 제한
    if (camera.position.z > 20) camera.position.z = 20;
    if (camera.position.z < -20) camera.position.z = -20;
  });
  
  return null;
}

// 3D 씬 설정 컴포넌트
function SceneSetup() {
  const orbitControlsRef = useRef();
  const gpuTier = useDetectGPU();
  const isLowEndDevice = gpuTier.tier < 2;
  const { scene, gl } = useThree();
  
  // 씬 최적화 설정
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#ffffff', 0.05);
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.shadowMap.enabled = true;

    return () => {
      scene.fog = null;
    };
  }, [scene, gl]);
  
  // 저사양 기기 감지
  const isLowEnd = useEffect(() => {
    // 모바일 기기나 저사양 기기 감지
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const gpu = gl.capabilities.maxAnisotropy < 8;
    return isMobile || gpu;
  }, [gl]);

  return (
    <>
      {/* 씬 설정 */}
      <color attach="background" args={['#f0f0f0']} />
      <fog attach="fog" args={['#f0f0f0', 20, 30]} />
      <CameraPositionLimit />
      
      {/* 조명 설정 */}
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={isLowEndDevice ? [1024, 1024] : [2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* 카메라 설정 */}
      <PerspectiveCamera 
        makeDefault 
        position={[10, 8, 10]} 
        fov={45}
        near={0.1}
        far={100}
      />
      
      {/* 컨트롤 설정 */}
      <OrbitControls
        ref={orbitControlsRef}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.8}
        panSpeed={0.8}
        zoomSpeed={0.8}
        minDistance={3}
        maxDistance={20}
        minPolarAngle={Math.PI / 7} // 30도
        maxPolarAngle={Math.PI / 7} // 90도
        minAzimuthAngle={-Math.PI / 2} // -90도
        maxAzimuthAngle={Math.PI / 2} // 90도
        makeDefault
      />
      
      {/* 그리드 설정 */}
      <Grid 
        position={[0, -0.01, 0]} 
        args={[20, 20]} 
        cellSize={1}
        cellThickness={0.6}
        cellColor="#a0a0a0"
        sectionSize={5}
        sectionThickness={1.2}
        sectionColor="#505050"
        fadeDistance={20}
        fadeStrength={1}
      />
      
      {/* HDRI 환경 */}
      <Environment preset="city" />
      
      <Suspense fallback={<Loader />}>
        {/* 3D 모델 */}
        <RecodeModel 
          position={[0, 0.01, 0]}
          scale={1}
          rotation={[0, Math.PI / 4, 0]}
        />
        
        {/* 좌표축 - 45도 회전 */}
        <group rotation={[0, Math.PI / 3, 3]}>
          <AxisHelper size={5} />
        </group>
        
        {/* 좌표 추적기 */}
        <CoordinateTracker />
      </Suspense>
    </>
  );
}

export default SceneSetup; 