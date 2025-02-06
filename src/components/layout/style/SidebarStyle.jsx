// File: components/style/SidebarStyle.jsx
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

/* SidebarContainer: 반응형으로 너비 조정 (데스크탑, 태블릿, 모바일) */
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


/* LockButton: 모바일에서 크기와 위치 조정 */
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

/* SidebarContent: 내부 여백과 타이포그래피를 반응형으로 조정 */
export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 60px;
  height: 100%;
  min-height: 100vh;
  z-index: 999;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding-top: 50px;
    h2 {
      font-size: 1.3rem;
      margin-bottom: 16px;
    }
  }

  @media (max-width: 480px) {
    padding-top: 40px;
    h2 {
      font-size: 1.1rem;
      margin-bottom: 12px;
    }
  }
`;

/* MenuList: 메뉴 간격 조정 */
export const MenuList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

/* MenuItem: 링크 패딩과 폰트 사이즈 반응형으로 조정 */
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
    
    @media (max-width: 480px) {
      padding: 8px 10px;
      font-size: 0.85rem;
    }
  }
`;

/* StyledNavLink: 선택된 메뉴 항목 스타일 */
export const StyledNavLink = styled(NavLink)`
  &.selected {
    background-color: #444;
    font-weight: bold;
  }
`;
