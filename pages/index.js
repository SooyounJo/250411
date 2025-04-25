import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import styled from 'styled-components';
import { Loader } from '@react-three/drei';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SceneSetup from '../components/SceneSetup';

// 동적 임포트로 컴포넌트 지연 로딩
const RecodeModel = dynamic(() => import('../components/RecodeModel'), { ssr: false });
const CoordinateTracker = dynamic(() => import('../components/three/CoordinateTracker'), { ssr: false });

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
  position: relative;
`;

const StyledLoader = styled(Loader)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(245, 245, 245, 0.8);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLayer, setCurrentLayer] = useState('layer1');
  const [showCoordinates, setShowCoordinates] = useState(false);
  
  // 로딩 종료 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 단축키 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 숫자키 1-5로 레이어 변경
      if (e.key >= '1' && e.key <= '5') {
        setCurrentLayer(`layer${e.key}`);
      }
      
      // C키로 좌표 표시 토글
      if (e.key.toLowerCase() === 'c') {
        setShowCoordinates(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden', 
      backgroundColor: '#f5f5f5',
      position: 'relative'
    }}>
      <Head>
        <title>3D 모델 뷰어</title>
        <meta name="description" content="React Three Fiber를 이용한 3D 모델 뷰어" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {isLoading && <StyledLoader />}
      
      <Canvas shadows dpr={[1, 2]} performance={{ min: 0.5 }}>
        <SceneSetup>
          <Suspense fallback={
            <Html center>
              <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '5px' }}>
                모델 로딩 중...
              </div>
            </Html>
          }>
            <RecodeModel currentLayer={currentLayer} />
            {showCoordinates && <CoordinateTracker />}
          </Suspense>
        </SceneSetup>
      </Canvas>
    </div>
  );
}
