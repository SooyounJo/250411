import React from 'react';
import { Html } from '@react-three/drei';

// 좌표축 컴포넌트
function AxisHelper({ size = 5 }) {
  return (
    <group>
      {/* X축 (빨간색) */}
      <mesh position={[size/2, 0, 0]}>
        <boxGeometry args={[size, 0.05, 0.05]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <Html position={[size + 0.2, 0, 0]}>
        <div style={{ color: 'red', fontWeight: 'bold' }}>X</div>
      </Html>
      
      {/* Y축 (녹색) */}
      <mesh position={[0, size/2, 0]}>
        <boxGeometry args={[0.05, size, 0.05]} />
        <meshBasicMaterial color="green" />
      </mesh>
      <Html position={[0, size + 0.2, 0]}>
        <div style={{ color: 'green', fontWeight: 'bold' }}>Y</div>
      </Html>
      
      {/* Z축 (파란색) */}
      <mesh position={[0, 0, size/2]}>
        <boxGeometry args={[0.05, 0.05, size]} />
        <meshBasicMaterial color="blue" />
      </mesh>
      <Html position={[0, 0, size + 0.2]}>
        <div style={{ color: 'blue', fontWeight: 'bold' }}>Z</div>
      </Html>
    </group>
  );
}

export default AxisHelper; 