import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { OuterContainer, BodyContainer, MainContent, HoverTrigger } from './style/LayoutStyle';



function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);  // Hover로 열림/닫힘
  const [isLocked, setIsLocked] = useState(false); // Lock 버튼

  const location = useLocation();
  const pathName = location.pathname;

  // 실제 열림 여부: (Hover로 열렸거나) or (Locked)
  const actualOpen = isOpen || isLocked;

  // 투명 트리거에 마우스 진입
  const handleTriggerEnter = () => {
    if (!isLocked) {
      setIsOpen(true);
    }
  };

  // 사이드바(열린 영역)에서 마우스가 나감
  const handleSidebarLeave = () => {
    if (!isLocked) {
      setIsOpen(false);
    }
  };

  // Lock / Unlock
  const handleLockToggle = () => {
    if (!isLocked) {
      // Lock 켜면, 메인 콘텐츠는 오른쪽으로 밀려야 하므로 isOpen도 true
      setIsLocked(true);
      setIsOpen(true);
    } else {
      // Unlock
      setIsLocked(false);
      // 마우스가 이미 나가 있다면 즉시 닫힘
    }
  };


  return (
    <OuterContainer>
      <Header
        pathName={pathName}
      />

      <BodyContainer>
        {!actualOpen && (
          <HoverTrigger onMouseEnter={handleTriggerEnter} />
        )}

        {/* 사이드바 */}
        <Sidebar
          isOpen={actualOpen}
          isLocked={isLocked}
          onMouseEnter={handleTriggerEnter}
          onMouseLeave={handleSidebarLeave}
          onLockToggle={handleLockToggle}
          pathName={pathName}
        />

        {/* 메인 콘텐츠 */}
        <MainContent>
          {children}
        </MainContent>
      </BodyContainer>

      <Footer />
    </OuterContainer>
  );
}

export default Layout;
