import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// 모바일에서 보이는 햄버거 메뉴 아이콘
export const MobileMenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

// HeaderNav: 데스크탑에서는 가로 배열, 모바일에서는 햄버거 메뉴 토글에 따라 세로 배열로 표시
export const HeaderNav = styled.nav`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: ${props => (props.$isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: linear-gradient(135deg, #252850, #181a31);
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  &.selected {
    font-weight: bold;
    color: #FFD700;
  }
`;
