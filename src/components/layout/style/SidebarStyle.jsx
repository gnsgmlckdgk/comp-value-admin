import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

/* 사이드바: locked=true (푸시 모드), locked=false (오버레이 모드) */
export const SidebarContainer = styled.div`
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  transition: width 0.3s ease-in-out;
  overflow: hidden;

  ${({ $isLocked, $isOpen }) =>
    $isLocked
      ? css`
          position: relative;
          width: ${$isOpen ? '240px' : '0px'};
          z-index: 999;
          @media (max-width: 768px) {
            width: ${$isOpen ? '200px' : '0px'};
          }
        `
      : css`
          position: absolute;
          top: 0;
          left: 0;
          width: ${$isOpen ? '240px' : '0px'};
          z-index: 999;
          @media (max-width: 768px) {
            width: ${$isOpen ? '200px' : '0px'};
          }
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
  z-index: 1000;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    padding: 4px 8px;
    font-size: 0.8rem;
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 60px;
  height: 100%;
  min-height: 100vh;
  z-index: 999;

  @media (max-width: 768px) {
    padding-top: 50px;
  }
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
    
    @media (max-width: 768px) {
      padding: 10px 15px;
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  &.selected {
    background-color: #444;
    font-weight: bold;
  }
`;
