import React from 'react';
import {
  SidebarContainer,
  LockButton,
  SidebarContent,
  MenuList,
  MenuItem,
  StyledNavLink
} from './style/SidebarStyle'

/**
 * Sidebar
 * - locked=true => 푸시 모드 (flex item), 폭: 0 or 240
 * - locked=false => 오버레이 모드 (absolute), 폭: 0 or 240
 * - 마우스 호버로 열리고(onMouseEnter), 떠나면 닫힘(onMouseLeave) - 단, locked=false 일때만
 * - Lock 버튼 클릭 => lock 토글
 */
function Sidebar({
  isOpen,
  isLocked,
  onMouseEnter,
  onMouseLeave,
  onLockToggle,
  pathName
}) {

  const sel = 'selected';

  // 열려 있거나 잠긴 상태이면 내부 컨텐츠 표시
  const showContent = isOpen || isLocked;

  return (
    <SidebarContainer
      $isLocked={isLocked}
      $isOpen={isOpen}
      onMouseEnter={onMouseEnter}  // 오버레이 모드에서 호버 시 열림
      onMouseLeave={onMouseLeave}  // 오버레이 모드에서 떠나면 닫힘
    >
      {/* 락 버튼: 열려있을 때만 보여줄 수도 있고, 
          locked=true 여도 항상 보이게 해도 됨. */}
      {showContent && (
        <LockButton onClick={onLockToggle}>
          {isLocked ? 'Unlock' : 'Lock'}
        </LockButton>
      )}

      {showContent && (
        <SidebarContent>
          <h2>My Sidebar</h2>
          <MenuList>
            <MenuItem>
              <StyledNavLink to="/" end className={pathName === '/' ? sel : ''}>
                HOME
              </StyledNavLink>
            </MenuItem>
            <MenuItem>
              <StyledNavLink to="/complist" className={pathName === '/complist' ? sel : ''}>기업목록</StyledNavLink>
            </MenuItem>
            <MenuItem>
              <StyledNavLink to="/compvalue" className={pathName === '/compvalue' ? sel : ''}>기업가치</StyledNavLink>
            </MenuItem>
            {/* etc */}
          </MenuList>
        </SidebarContent>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;
