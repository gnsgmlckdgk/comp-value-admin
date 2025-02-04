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
  line-height: 60px;
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

export const HeaderNav = styled.nav`
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* 화면 폭이 좁아지면 아래 줄로 넘어가게 */

  @media (max-width: 768px) {
    gap: 10px;
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
    color: #FFD700; /* Gold */
  }
`;
