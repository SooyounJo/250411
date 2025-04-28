import React, { Suspense, useEffect, useRef } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useFBX, useGLTF, useTexture, Grid, Environment, useDetectGPU } from '@react-three/drei';
import * as THREE from 'three';

// 카메라 위치 제한 컴포넌트
function CameraPositionLimit({ children }) {
  const { camera, scene } = useThree();
  const lastValidPosition = useRef(new THREE.Vector3());
  
  useEffect(() => {
    // 초기 유효 위치 설정
    lastValidPosition.current.copy(camera.position);
  }, [camera]);
  
  useFrame(() => {
    // 카메라 움직임 제한
    const pos = camera.position;
    const isInvalidPosition = 
      pos.x < -10 || pos.x > 10 || 
      pos.y < 0.5 || pos.y > 15 || 
      pos.z < -10 || pos.z > 10;
    
    if (isInvalidPosition) {
      // 유효 범위를 벗어나면 마지막 유효 위치로 되돌림
      camera.position.copy(lastValidPosition.current);
    } else {
      // 유효한 위치 저장
      lastValidPosition.current.copy(pos);
    }
  });
  
  return <>{children}</>;
}

export default function SceneSetup({ children }) {
  const controlsRef = useRef();
  const gpuTier = useDetectGPU();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // GPU 성능에 따른 최적화 설정
  const optimizationSettings = {
    shadowMapSize: gpuTier.tier > 2 ? 2048 : 1024,
    pixelRatio: Math.min(window.devicePixelRatio, gpuTier.tier > 2 ? 2 : 1.5),
    shadowBias: -0.0004,
    antialias: gpuTier.tier > 1,
    fogDensity: 0.02,
    envMapIntensity: gpuTier.tier > 2 ? 1.0 : 0.7
  };
  
  useEffect(() => {
    // 렌더러 최적화
    if (window.__TROIS_RENDERER__) {
      const renderer = window.__TROIS_RENDERER__;
      renderer.setPixelRatio(optimizationSettings.pixelRatio);
      
      // 그림자 맵 품질 설정
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      // 모바일 디바이스일 경우 추가 최적화
      if (isMobile) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
      }
    }
  }, [gpuTier.tier, isMobile]);
  
  // OrbitControls 최적화
  useFrame(() => {
    if (controlsRef.current) {
      // 매 프레임마다 damping 업데이트
      controlsRef.current.update();
    }
  });
  
  return (
    <>
      {/* 씬 최적화 설정 */}
      <color attach="background" args={['#f5f5f5']} />
      <fog attach="fog" args={['#f5f5f5', 10, 30]} />
      
      {/* 조명 설정 */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        castShadow 
        position={[0.88, 3, -1.66]} 
        intensity={1.2}
        shadow-mapSize={[optimizationSettings.shadowMapSize, optimizationSettings.shadowMapSize]}
        shadow-bias={optimizationSettings.shadowBias}
      >
        <orthographicCamera 
          attach="shadow-camera" 
          args={[-10, 10, 10, -10, 0.1, 50]} 
        />
      </directionalLight>
      
      {/* 카메라 설정 */}
      <PerspectiveCamera
        makeDefault
        position={[2, 2, 1.8]}
        fov={isMobile ? 60 : 50}
        near={0.1}
        far={1000}
      />
      
      {/* 카메라 컨트롤러 */}
      <CameraPositionLimit>
        <OrbitControls
          ref={controlsRef}
          enableDamping={true}
          dampingFactor={0.15}
          rotateSpeed={isMobile ? 0.6 : 0.8}
          panSpeed={0.8}
          minDistance={0.9}
          maxDistance={100}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          minAzimuthAngle={Math.PI / 0.2}
          maxAzimuthAngle={Math.PI / 3}
          enablePan={!isMobile}
          zoomSpeed={0}
          zoomToCursor={true}
        />
      </CameraPositionLimit>
      
      {/* 그리드 및 환경 */}
      <Grid 
        position={[0, -0.01, 0]} 
        args={[20, 20]} 
        cellSize={1}
        cellThickness={0.6}
        cellColor="#a0a0a0"
        sectionSize={5}
        sectionColor="#4d4d4d"
        fadeDistance={15}
        fadeStrength={1}
        visible={true}
      />
      {/* <Environment preset="city" intensity={optimizationSettings.envMapIntensity} /> */}
      
      {/* 컨텐츠 */}
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </>
  );
} 