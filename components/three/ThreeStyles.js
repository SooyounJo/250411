import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';

// 스타일 컴포넌트
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff; /* 흰색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed; /* 전체 화면에 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 0;
  margin: 0;
`;

// Canvas 컴포넌트 스타일
export const StyledCanvas = styled(Canvas)`
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  touch-action: none;
`; 