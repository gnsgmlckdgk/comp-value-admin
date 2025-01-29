import React from 'react';
import { HeaderContainer, Logo, HeaderNav, StyledNavLink } from './style/HeaderStyle'

const Header = ({ pathName }) => {

  const sel = 'selected';

  return (
    <HeaderContainer>
      <Logo>My Website</Logo>
      <HeaderNav>
        <StyledNavLink to="/" className={pathName === '/' ? sel : ''}>Home</StyledNavLink>
        <StyledNavLink to="/complist" className={pathName === '/complist' ? sel : ''}>기업목록</StyledNavLink>
        <StyledNavLink to="/compvalue" className={pathName === '/compvalue' ? sel : ''}>기업가치</StyledNavLink>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
