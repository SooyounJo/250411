import styled, { keyframes } from "styled-components";
import Image from "next/image";

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// About page styled components
export const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 8rem 5%;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

export const AboutTitle = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4rem);
  margin-bottom: 3rem;
  color: #ffffff;
  font-weight: 300;
  line-height: 1.1;
  animation: ${fadeIn} 1s ease-out;
`;

export const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const AboutText = styled.div`
  max-width: 550px;
`;

export const AboutDescription = styled.p`
  font-size: 1.1rem;
  color: #aaaaaa;
  margin-bottom: 2rem;
  line-height: 1.7;
  animation: ${fadeIn} 1s ease-out 0.2s forwards;
`;

export const AboutImageContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  background-color: #252525;
  animation: ${fadeIn} 1s ease-out 0.4s forwards;
  opacity: 0;
`;

export const AboutValues = styled.div`
  margin-top: 8rem;
`;

export const ValuesTitle = styled.h2`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ValueCard = styled.div`
  padding: 2rem;
  background-color: #1e1e1e;
`;

export const ValueTitle = styled.h3`
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 400;
`;

export const ValueDescription = styled.p`
  font-size: 0.9rem;
  color: #aaaaaa;
  line-height: 1.6;
`; 