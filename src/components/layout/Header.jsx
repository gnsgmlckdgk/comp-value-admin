import React from 'react';
import { HeaderContainer, Logo, HeaderNav, StyledNavLink } from './style/HeaderStyle';
import { menuItems } from '../../config/menuConfig';

const Header = ({ pathName }) => {
  const selectedClass = 'selected';

  return (
    <HeaderContainer>
      <Logo>HCH</Logo>
      <HeaderNav>
        {menuItems.map(({ path, label }) => (
          <StyledNavLink
            key={path}
            to={path}
            className={path === pathName ? selectedClass : ''}
          >
            {label}
          </StyledNavLink>
        ))}
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
