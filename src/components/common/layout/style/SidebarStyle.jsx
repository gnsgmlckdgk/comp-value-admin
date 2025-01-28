import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

/* 
  사이드바를 오버레이(absolute) vs 푸시(flex item) 로 전환
  - locked = true -> 푸시
  - locked = false -> 오버레이
*/
export const SidebarContainer = styled.div`
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

export const LockButton = styled.button`
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

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 60px;
  height: 100%;
  min-height: 100vh;
`;

export const MenuList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin-top: 40px;
`;

export const MenuItem = styled.li`
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

export const StyledNavLink = styled(NavLink)`
  &.selected {
    background-color: #444;
    font-weight: bold;
  }
`;