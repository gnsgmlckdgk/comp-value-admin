// File: components/Sidebar.jsx
import React from 'react';
import {
  SidebarContainer,
  LockButton,
  SidebarContent,
  MenuList,
  MenuItem,
  StyledNavLink
} from './style/SidebarStyle';
import { menuItems } from '../../config/menuConfig';

const Sidebar = ({
  isOpen,
  isLocked,
  onMouseEnter,
  onMouseLeave,
  onLockToggle,
  pathName
}) => {
  const selectedClass = 'selected';
  const showContent = isOpen || isLocked;

  return (
    <SidebarContainer
      $isLocked={isLocked}
      $isOpen={isOpen}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showContent && (
        <>
          <LockButton onClick={onLockToggle}>
            {isLocked ? 'Unlock' : 'Lock'}
          </LockButton>
          <SidebarContent>
            <h2>HCH</h2>
            <MenuList>
              {menuItems.map(({ path, label, show }) => (
                show ?
                  <MenuItem key={path}>
                    <StyledNavLink to={path} className={path === pathName ? selectedClass : ''}>
                      {label}
                    </StyledNavLink>
                  </MenuItem>
                  : ""
              ))}
            </MenuList>
          </SidebarContent>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
