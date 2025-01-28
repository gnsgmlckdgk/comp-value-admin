import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

/* 
  사이드바를 오버레이(absolute) vs 푸시(flex item) 로 전환
  - locked = true -> 푸시
  - locked = false -> 오버레이
*/
const SidebarContainer = styled.div`
  /* 공통 스타일 */
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  transition: width 0.3s ease-in-out;
  overflow: hidden;

  ${({ $isLocked, $isOpen }) =>
    $isLocked
      ? css`
          /* 푸시 모드: flex item */
          position: relative;
          width: ${$isOpen ? '240px' : '0px'};
        `
      : css`
          /* 오버레이 모드: absolute
             BodyContainer가 relative 이므로 그 안에 절대배치
          */
          position: absolute;
          top: 0;
          left: 0;
          width: ${$isOpen ? '240px' : '0px'};
        `}
`;

const LockButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #181a31;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  padding: 6px 10px;
  cursor: pointer;
  z-index: 10;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 60px;
  height: 100%;
  min-height: 100vh;
`;

const MenuList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin-top: 40px;
`;

const MenuItem = styled.li`
  cursor: pointer;
  a {
    display: block;
    width: 100%;
    padding: 15px 20px;
    color: #fff;
    text-decoration: none;
    transition: background 0.2s;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &.selected {
    background-color: #444;
    font-weight: bold;
  }
`;

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
              <StyledNavLink to="/cal/compvalue" className={pathName === '/cal/compvalue' ? sel : ''}>
                기업가치
              </StyledNavLink>
            </MenuItem>
            {/* etc */}
          </MenuList>
        </SidebarContent>
      )}
    </SidebarContainer>
  );
}

export default Sidebar;
