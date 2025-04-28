import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Styled components
const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--font-geist-sans);
  background-color: #121212;
  color: #ffffff;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 5%;
  background-color: rgba(18, 18, 18, 0.8);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #aaaaaa;
  font-weight: 400;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  
  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -3px;
    left: 0;
    background-color: #ffffff;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #ffffff;
    &:after {
      width: 100%;
    }
  }
`;

const Footer = styled.footer`
  padding: 3rem 5%;
  background-color: #121212;
  color: #666;
  border-top: 1px solid #333;
  font-size: 0.8rem;
  text-align: center;
`;

const Layout = ({ children, title = 'Minimal Product Portfolio' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Minimalism Product Design Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header>
          <Link href="/about" passHref>
            <Logo>MINIMAL</Logo>
          </Link>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
          </Nav>
        </Header>
        <Main>
          {children}
        </Main>
        <Footer>
          © 2023 Minimal Design Studio. All rights reserved.
        </Footer>
      </Page>
    </>
  );
};

export default Layout; 