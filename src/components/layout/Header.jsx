import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { HeaderContainer, Logo, HeaderNav, StyledNavLink, MobileMenuIcon } from './style/HeaderStyle';
import { menuItems } from '@config/menuConfig';

// 하위 메뉴(드롭다운) 컨테이너
const DropdownContainer = styled.div`
  position: absolute;
  top: 100%; /* 부모 메뉴 바로 아래 */
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

// 하위 메뉴 항목 스타일 (StyledNavLink 확장)
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

  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // 메뉴 항목에 마우스 오버 시, 하위 메뉴가 있다면 방향 설정 후 상태 업데이트
  const handleMouseEnter = (menu, e) => {
    if (menu.subItems) {
      const rect = e.currentTarget.getBoundingClientRect();
      const dropdownWidth = 150;
      const direction = (rect.right + dropdownWidth > window.innerWidth) ? 'left' : 'right';
      setDropdownDirection(prev => ({ ...prev, [menu.path]: direction }));
    }
    setHoveredMenu(menu.path);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  // 상위 메뉴의 활성화 여부를 판단하는 함수
  // 현재 경로가 상위 메뉴의 경로 또는 그 하위 메뉴들 중 하나의 경로와 일치하면 true 반환
  const isMenuSelected = (menu) => {
    if (location.pathname === menu.path || location.pathname.startsWith(menu.path + '/')) {
      return true;
    }
    if (menu.subItems && menu.subItems.length > 0) {
      return menu.subItems.some(sub => (
        location.pathname === sub.path || location.pathname.startsWith(sub.path + '/')
      ));
    }
    return false;
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
              className={isMenuSelected(menu) ? 'selected' : ''}
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