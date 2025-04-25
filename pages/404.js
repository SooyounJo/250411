import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
`

const StyledLink = styled.a`
  color: #0070f3;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export default function Custom404() {
  return (
    <Container>
      <Title>404 - 페이지를 찾을 수 없습니다</Title>
      <Description>
        요청하신 페이지가 존재하지 않습니다.
      </Description>
      <Link href="/" passHref>
        <StyledLink>홈으로 돌아가기</StyledLink>
      </Link>
    </Container>
  )
} 