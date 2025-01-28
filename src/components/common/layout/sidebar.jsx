import React, { useState } from 'react';
import styled from 'styled-components';

/*
  Sidebar를 감싸는 Wrapper
  - 이 Wrapper에 마우스가 들어오면 (onMouseEnter) => 사이드바 open
  - 이 Wrapper 영역을 벗어나면 (onMouseLeave) => 사이드바 close
*/
const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 999;
`;

/* 사이드바 열리기 전에도 살짝 보일 버튼 영역 (마우스 호버 유도) */
const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: 0;
  padding: 8px 12px;
  background-color: #181a31;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #202247;
  }
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  transition: transform 0.3s ease-in-out;

  /* isOpen에 따라 왼쪽 밖(-100%) 혹은 0으로 이동 */
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
`;

const SidebarTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
`;

const MenuList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin-top: 40px;
`;

const MenuItem = styled.li`
  width: 100%;
  padding: 15px 20px;
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <SidebarWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 
        클릭 기능 없이 표시만 하는 버튼 (아이콘/텍스트)
        마우스를 여기 근처로 이동하면 사이드바가 열림 
      */}
      <ToggleButton>Menu</ToggleButton>

      {/* 실제 사이드바 */}
      <SidebarContainer isOpen={isOpen}>
        <SidebarTitle>My Sidebar</SidebarTitle>
        <MenuList>
          <MenuItem>대시보드</MenuItem>
          <MenuItem>게시판</MenuItem>
          <MenuItem>설정</MenuItem>
          <MenuItem>로그아웃</MenuItem>
        </MenuList>
      </SidebarContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;
