import React, { useState } from 'react';
import { HeaderContainer, Logo, HeaderNav, StyledNavLink, MobileMenuIcon } from './style/HeaderStyle';
import { menuItems } from '../../config/menuConfig';

const Header = ({ pathName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <StyledNavLink to="/" style={{ textDecoration: 'none' }}>
        <Logo>HCH</Logo>
      </StyledNavLink>
      <MobileMenuIcon onClick={toggleMobileMenu}>
        &#9776;
      </MobileMenuIcon>
      <HeaderNav $isOpen={isMobileMenuOpen}>
        {menuItems.map(({ path, label, show }) => (
          show ?
            <StyledNavLink
              key={path}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={path === pathName ? 'selected' : ''}
            >
              {label}
            </StyledNavLink>
            : ""
        ))}
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
