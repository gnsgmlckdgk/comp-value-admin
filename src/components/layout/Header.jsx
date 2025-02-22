import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { HeaderContainer, Logo, HeaderNav, StyledNavLink, MobileMenuIcon } from './style/HeaderStyle';
import { menuItems } from '@config/menuConfig';

// 하위 메뉴(드롭다운) 컨테이너
const DropdownContainer = styled.div`
  position: absolute;
  top: 100%; /* 부모 메뉴 바로 아래에 위치 */
  ${props => (props.$direction === 'left' ? 'right: 0;' : 'left: 0;')}
  background: linear-gradient(135deg, #252850, #181a31);
  min-width: 150px;
  padding: 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: translateY(${props => (props.$visible ? '0' : '-10px')});
  pointer-events: ${props => (props.$visible ? 'auto' : 'none')};
  z-index: 1100;
`;

// 하위 메뉴 항목 스타일 (기존 StyledNavLink 확장)
const DropdownItem = styled(StyledNavLink)`
  display: block;
  padding: 8px 12px;
  font-size: 0.9rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Header = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [dropdownDirection, setDropdownDirection] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 현재 URL 경로를 가져옴
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // 메뉴 항목에 마우스 오버 시, 하위 메뉴가 있다면 위치를 계산해서 방향 설정
  const handleMouseEnter = (menu, e) => {
    if (menu.subItems) {
      const rect = e.currentTarget.getBoundingClientRect();
      const dropdownWidth = 150; // 드롭다운 최소 너비
      const direction = (rect.right + dropdownWidth > window.innerWidth) ? 'left' : 'right';
      setDropdownDirection(prev => ({ ...prev, [menu.path]: direction }));
    }
    setHoveredMenu(menu.path);
  };

  // 메뉴 항목에서 마우스 벗어나면 드롭다운 숨김
  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  // 상위 메뉴가 선택된 상태를 판단하는 함수  
  // 현재 경로가 메뉴의 path와 정확히 일치하거나, 메뉴 path 다음에 '/'가 붙은 경우 선택된 것으로 간주합니다.
  const isMenuSelected = (menuPath) => {
    return location.pathname === menuPath || location.pathname.startsWith(menuPath + '/');
  };

  return (
    <HeaderContainer>
      {/* 로고 영역 */}
      <StyledNavLink to="/" style={{ textDecoration: 'none' }}>
        <Logo>HCH</Logo>
      </StyledNavLink>

      {/* 데스크탑 메뉴 영역 */}
      <HeaderNav $isOpen={isMobileMenuOpen}>
        {menuItems.filter(({ show }) => show).map(menu => (
          <div
            key={menu.path}
            style={{ position: 'relative' }}
            onMouseEnter={(e) => handleMouseEnter(menu, e)}
            onMouseLeave={handleMouseLeave}
          >
            <StyledNavLink
              to={menu.path}
              className={isMenuSelected(menu.path) ? 'selected' : ''}
            >
              {menu.label}
            </StyledNavLink>
            {menu.subItems && (
              <DropdownContainer
                $visible={hoveredMenu === menu.path}
                $direction={dropdownDirection[menu.path] || 'right'}
              >
                {menu.subItems.filter(sub => sub.show).map(sub => (
                  <DropdownItem key={sub.path} to={sub.path}>
                    {sub.label}
                  </DropdownItem>
                ))}
              </DropdownContainer>
            )}
          </div>
        ))}
      </HeaderNav>

      {/* 모바일 햄버거 메뉴 아이콘 */}
      <MobileMenuIcon onClick={toggleMobileMenu}>
        &#9776;
      </MobileMenuIcon>
    </HeaderContainer>
  );
};

export default Header;