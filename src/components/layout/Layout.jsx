import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { OuterContainer, BodyContainer, MainContent, HoverTrigger } from './style/LayoutStyle';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);    // Hover로 열림/닫힘 상태
  const [isLocked, setIsLocked] = useState(false);  // Lock 버튼 상태

  // useLocation을 통해 현재 경로를 가져옴 (구조 분해 할당 사용)
  const { pathname: pathName } = useLocation();

  // 사이드바가 열려 있는 실제 여부: (Hover 또는 Lock)
  const isSidebarOpen = isOpen || isLocked;

  // 투명 트리거에 마우스 진입 시, Lock 상태가 아니라면 사이드바를 열기
  const handleTriggerEnter = () => {
    if (!isLocked) {
      setIsOpen(true);
    }
  };

  // 사이드바 영역에서 마우스가 나가면, Lock 상태가 아니라면 사이드바를 닫기
  const handleSidebarLeave = () => {
    if (!isLocked) {
      setIsOpen(false);
    }
  };

  // Lock 버튼 토글: Lock 켜면 사이드바를 열고, Lock 해제 시 Lock 상태만 해제
  const handleLockToggle = () => {
    if (!isLocked) {
      setIsLocked(true);
      setIsOpen(true);
    } else {
      setIsLocked(false);
      // 필요 시, 마우스 상태에 따라 isOpen 상태를 추가로 조정할 수 있음
    }
  };

  return (
    <OuterContainer>
      <Header pathName={pathName} />

      <BodyContainer>
        {!isSidebarOpen && <HoverTrigger onMouseEnter={handleTriggerEnter} />}

        <Sidebar
          isOpen={isSidebarOpen}
          isLocked={isLocked}
          onMouseEnter={handleTriggerEnter}
          onMouseLeave={handleSidebarLeave}
          onLockToggle={handleLockToggle}
          pathName={pathName}
        />

        <MainContent>{children}</MainContent>
      </BodyContainer>

      <Footer />
    </OuterContainer>
  );
};

export default Layout;
