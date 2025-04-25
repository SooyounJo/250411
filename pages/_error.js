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
  background-color: #f7f7f7;
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

function Error({ statusCode }) {
  return (
    <Container>
      <Title>
        {statusCode
          ? `서버에서 ${statusCode} 에러가 발생했습니다`
          : '클라이언트에서 에러가 발생했습니다'}
      </Title>
      <Description>죄송합니다. 페이지를 표시할 수 없습니다.</Description>
      <Link href="/" passHref>
        <StyledLink>홈으로 돌아가기</StyledLink>
      </Link>
    </Container>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 