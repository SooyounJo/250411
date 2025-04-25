import React, { useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// 좌표 추적기 컴포넌트
function CoordinateTracker() {
  const { camera, mouse, scene } = useThree();
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const raycaster = new THREE.Raycaster();

  // 바닥 평면 생성 (보이지 않는 평면)
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const tempVector = new THREE.Vector3();
  
  useFrame(() => {
    // 마우스 위치에서 광선 발사
    raycaster.setFromCamera(mouse, camera);
    
    // 평면과의 교차점 계산
    if (raycaster.ray.intersectPlane(floorPlane, tempVector)) {
      setPosition({
        x: parseFloat(tempVector.x.toFixed(2)),
        y: parseFloat(tempVector.y.toFixed(2)),
        z: parseFloat(tempVector.z.toFixed(2))
      });
    }
  });

  return (
    <Html
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        pointerEvents: 'none'
      }}
    >
      <div style={{
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#ff5555', fontWeight: 'bold', width: '25px', display: 'inline-block' }}>X:</span> {position.x}
        </div>
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#55ff55', fontWeight: 'bold', width: '25px', display: 'inline-block' }}>Y:</span> {position.y}
        </div>
        <div>
          <span style={{ color: '#5555ff', fontWeight: 'bold', width: '25px', display: 'inline-block' }}>Z:</span> {position.z}
        </div>
      </div>
    </Html>
  );
}

export default CoordinateTracker; 