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

/**
 * Sidebar 컴포넌트
 * - locked=true: 푸시 모드 (flex item), 폭: 0 또는 240px
 * - locked=false: 오버레이 모드 (absolute), 폭: 0 또는 240px
 * - 마우스 호버로 열리고(onMouseEnter), 떠나면 닫힘(onMouseLeave) - 단, locked=false 일 때만
 * - Lock 버튼 클릭 => lock 토글
 */
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
              {menuItems.map(({ path, label }) => (
                <MenuItem key={path}>
                  <StyledNavLink
                    to={path}
                    end
                    className={path === pathName ? selectedClass : ''}
                  >
                    {label}
                  </StyledNavLink>
                </MenuItem>
              ))}
            </MenuList>
          </SidebarContent>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
