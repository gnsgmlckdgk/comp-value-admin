import React from 'react';
import styled from 'styled-components';

/* 헤더 컨테이너(고정) */
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;

  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  z-index: 1000; /* 사이드바 위로 */
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const HeaderNav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Logo>My Website</Logo>
            <HeaderNav>
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#profile">Profile</NavLink>
                <NavLink href="#contact">Contact</NavLink>
            </HeaderNav>
        </HeaderContainer>
    );
};

export default Header;
