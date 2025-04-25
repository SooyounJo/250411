import React from 'react';
import { Html } from '@react-three/drei';

// 로딩 컴포넌트
function Loader() {
  return (
    <Html center>
      <div style={{ 
        background: 'rgba(0,0,0,0.7)', 
        color: 'white', 
        padding: '12px 24px', 
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        로딩 중...
      </div>
    </Html>
  );
}

export default Loader; 