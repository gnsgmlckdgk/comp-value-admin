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
  const selectedClass = 'selected';
  const showContent = isOpen || isLocked;

  // 현재 메뉴가 active한지 판단하는 함수 (부모 혹은 하위 메뉴가 현재 페이지인지)
  const isMenuActive = (menu) => {
    if (menu.path === pathName) return true;
    if (menu.subItems && menu.subItems.some(sub => sub.path === pathName)) return true;
    return false;
  };

  // 현재 페이지에 해당하는 메뉴 그룹만 필터링
  const activeMenus = menuItems.filter(menu => menu.show && isMenuActive(menu));

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
              {activeMenus.map(menu => (
                <React.Fragment key={menu.path}>
                  {/* 1뎁스 메뉴 - subItems가 있는 경우 selected 스타일 적용 안함 */}
                  <MenuItem>
                    <StyledNavLink
                      to={menu.path}
                      className={
                        menu.subItems && menu.subItems.length > 0
                          ? ''
                          : (menu.path === pathName ? selectedClass : '')
                      }
                    >
                      {menu.label}
                    </StyledNavLink>
                  </MenuItem>
                  {/* subItems가 있다면 항상 표시 */}
                  {menu.subItems && menu.subItems.map(sub => (
                    sub.show && (
                      <MenuItem key={sub.path} style={{ paddingLeft: '20px' }}>
                        <StyledNavLink
                          to={sub.path}
                          className={sub.path === pathName ? selectedClass : ''}
                        >
                          {sub.label}
                        </StyledNavLink>
                      </MenuItem>
                    )
                  ))}
                </React.Fragment>
              ))}
            </MenuList>
          </SidebarContent>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;