import React from 'react';
import Image from 'next/image';
import {
  AboutSection,
  AboutTitle,
  AboutContent,
  AboutText,
  AboutDescription,
  AboutImageContainer,
  AboutValues,
  ValuesTitle,
  ValuesGrid,
  ValueCard,
  ValueTitle,
  ValueDescription
} from './styles';

// 디자인 가치 데이터
const values = [
  {
    title: "Minimal Aesthetics",
    description: "We believe in the power of simplicity. Our design approach focuses on removing the unnecessary to highlight what truly matters."
  },
  {
    title: "Functional Form",
    description: "Every design decision is driven by purpose. Form follows function, creating products that are intuitive, easy to use, and serve their purpose elegantly."
  },
  {
    title: "Sustainable Materials",
    description: "We carefully select materials that are durable, sustainable, and age beautifully. Quality that lasts is at the core of true minimalism."
  }
];

const AboutComponent = () => {
  return (
    <AboutSection>
      <AboutTitle>About Our Studio</AboutTitle>
      
      <AboutContent>
        <AboutText>
          <AboutDescription>
            Founded in 2019, Minimal Design Studio is dedicated to creating products that embody simplicity, functionality, and timeless aesthetics.
          </AboutDescription>
          
          <AboutDescription>
            Our approach to design is rooted in the belief that well-designed products should improve everyday life without demanding attention. We strip away the unnecessary to reveal the essential.
          </AboutDescription>
          
          <AboutDescription>
            Working with a select group of clients and partners, we create products that reflect our commitment to minimal aesthetics and functional design. Each project is an opportunity to explore the balance between form and function.
          </AboutDescription>
        </AboutText>
        
        <AboutImageContainer>
          <Image
            src="/fort2.png"
            alt="About our studio"
            fill
            style={{ objectFit: 'cover' }}
          />
        </AboutImageContainer>
      </AboutContent>
      
      <AboutValues>
        <ValuesTitle>Our Design Values</ValuesTitle>
        <ValuesGrid>
          {values.map((value, index) => (
            <ValueCard key={index}>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
      </AboutValues>
    </AboutSection>
  );
};

export default AboutComponent; 