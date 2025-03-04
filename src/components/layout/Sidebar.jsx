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
import { menuItems } from '@config/menuConfig';

const Sidebar = ({
  isOpen,
  isLocked,
  onMouseEnter,
  onMouseLeave,
  onLockToggle,
  pathName
}) => {
  // 동적 URL 처리를 위한 헬퍼 함수
  const matchRoute = (pattern, path) => {
    if (pattern.includes(':')) {
      // 동적 세그먼트 이전의 고정 부분만 추출 (예: '/board/freeBoard/view')
      const basePattern = pattern.split('/:')[0];
      return path.startsWith(basePattern);
    }
    return pattern === path;
  };

  // 메뉴 혹은 하위 메뉴 중 하나라도 현재 경로와 일치하는지 확인
  const isMenuActive = (menu) => {
    if (!menu.show) return false;
    if (menu.activePaths) {
      if (menu.activePaths.some(route => matchRoute(route, pathName))) return true;
    } else {
      if (matchRoute(menu.path, pathName)) return true;
    }
    if (menu.subItems) {
      return menu.subItems.some(sub => isMenuActive(sub));
    }
    return false;
  };

  // 상위(1뎁스) 메뉴 중 현재 경로에 해당하는 메뉴가 있으면 해당 메뉴만 표시
  const activeTopMenu = menuItems.find(menu => menu.show && isMenuActive(menu));
  const topMenusToDisplay = activeTopMenu ? [activeTopMenu] : menuItems.filter(menu => menu.show);

  // 재귀적으로 메뉴 항목들을 렌더링 (MenuList는 최상위에 한 번만 사용)
  const renderMenuItems = (items, depth = 0) => {
    return items.map(item => {
      if (!item.show) return null;
      // 동적 URL 처리를 포함하여 현재 메뉴가 선택되었는지 체크
      const isSelected = item.activePaths
        ? item.activePaths.some(route => matchRoute(route, pathName))
        : matchRoute(item.path, pathName);

      return (
        <React.Fragment key={item.path}>
          <MenuItem style={{ paddingLeft: `${depth * 20}px` }}>
            <StyledNavLink to={item.path} className={isSelected ? 'selected' : ''}>
              {item.label}
            </StyledNavLink>
          </MenuItem>
          {item.subItems && isMenuActive(item) && renderMenuItems(item.subItems, depth + 1)}
        </React.Fragment>
      );
    });
  };

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
              {renderMenuItems(topMenusToDisplay)}
            </MenuList>
          </SidebarContent>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;