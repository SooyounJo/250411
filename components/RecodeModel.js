import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// GLB 모델 미리 로드 (성능 최적화)
useGLTF.preload('/full5.glb');

export default function RecodeModel({ currentLayer, ...props }) {
  const group = useRef();
  const [modelReady, setModelReady] = useState(false);
  
  // layer 값 계산 (currentLayer에서 숫자 부분 추출)
  const layerNumber = parseInt((currentLayer || '').replace('layer', '')) - 1;
  
  // 메쉬 최적화 함수
  const optimizeMesh = (mesh) => {
    // 크기에 따라 그림자 최적화
    const size = new THREE.Vector3();
    if (mesh.geometry) {
      mesh.geometry.computeBoundingBox();
      mesh.geometry.boundingBox.getSize(size);
    }
    
    // 크기가 작은 메쉬는 그림자 비활성화
    const maxSize = Math.max(size.x, size.y, size.z);
    mesh.castShadow = maxSize > 0.5;
    mesh.receiveShadow = maxSize > 0.3;
    
    // 머티리얼 최적화
    if (mesh.material) {
      // 기존 머티리얼 속성 유지하면서 최적화
      mesh.material.roughness = 0.8;
      mesh.material.metalness = 0.2;
      mesh.material.envMapIntensity = 0.8;
      
      // 추가 최적화
      mesh.material.needsUpdate = false; // 자동 업데이트 비활성화
      mesh.frustumCulled = true; // 시야에서 벗어나면 렌더링 안함
      
      // 텍스처 최적화
      if (mesh.material.map) {
        mesh.material.map.anisotropy = 4; // 텍스처 품질과 성능 사이의 균형
      }
    }
    
    // 리소스 절약을 위한 추가 최적화
    if (mesh.geometry) {
      // 버텍스와 인덱스 메모리 최적화
      mesh.geometry.attributes.position.usage = THREE.StaticDrawUsage;
      if (mesh.geometry.index) {
        mesh.geometry.index.usage = THREE.StaticDrawUsage;
      }
    }
  };
  
  // 모델 로드 (레이어 변경시에도 재로드하지 않도록 useMemo 사용)
  const { scene, animations } = useGLTF('/full5.glb');
  const { actions, names } = useAnimations(animations, group);
  
  // 씬 추가 (useEffect로 변경하여 ref가 초기화된 후 실행되도록 함)
  useEffect(() => {
    if (!scene || !group.current) return;
    
    // 씬 클론 생성 (원본 보존)
    const clonedScene = scene.clone();
    
    clonedScene.traverse((child) => {
      // 메쉬 최적화
      if (child.isMesh) {
        optimizeMesh(child);
      }
    });
    
    // 내장 조명 제거
    clonedScene.traverse(child => {
      if (child.isLight) child.removeFromParent();
    });
    
    // 배경 및 환경 제거
    clonedScene.background = null;
    clonedScene.environment = null;
    
    // 원본 씬 메모리에서 참조 해제를 위한 설정
    group.current.clear();
    group.current.add(clonedScene);
    
    setModelReady(true);
    
    // 컴포넌트 언마운트 시 메모리 정리
    return () => {
      if (group.current) {
        group.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [scene]);
  
  // 레이어 변경에 따른 애니메이션
  useEffect(() => {
    if (modelReady && names.length > 0) {
      // 다른 애니메이션 중지
      names.forEach(name => {
        if (actions[name]) actions[name].stop();
      });
      
      // 현재 레이어 애니메이션 재생
      if (layerNumber >= 0 && layerNumber < names.length) {
        const action = actions[names[layerNumber]];
        if (action) {
          action.reset().fadeIn(0.5).play();
        }
      }
    }
    
    // 컴포넌트 언마운트 시 애니메이션 정리
    return () => {
      names.forEach(name => {
        if (actions[name]) actions[name].stop();
      });
    };
  }, [layerNumber, modelReady, actions, names]);
  
  return (
    <group ref={group} position={[0, 0, 0]} scale={5} rotation={[0, 0, 0]} {...props} />
  );
} 