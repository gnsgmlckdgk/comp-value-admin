import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const BodyContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  margin-top: 60px; /* Header가 position: fixed; height:60px이라 가정 */
  /* 
    locked 모드(푸시)일 때만 사이드바가 flex 아이템으로 공간을 차지.
    오버레이 모드일 때는 사이드바가 absolute로 떠서 메인 콘텐츠는 flex:1로 전부 사용
  */
`;

const MainContent = styled.main`
  flex: 1; /* 잠금 모드에서 사이드바의 폭을 제외한 나머지 공간 */
  background-color: #f0f1f6;
  padding: 20px;
  box-sizing: border-box;
`;


const HoverTrigger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  background: transparent;
  z-index: 100;
  /* 마우스 진입 시 isOpen=true */
`;


function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);  // Hover로 열림/닫힘
  const [isLocked, setIsLocked] = useState(false); // Lock 버튼

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
      <Header />

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
        />

        {/* 메인 콘텐츠 */}
        <MainContent>
          <h1>메인 콘텐츠</h1>
          <p>1) 닫히면 0px, 완전히 안보임</p>
          <p>2) Hover 시 오버레이 열림(콘텐츠 안 밀림)</p>
          <p>3) Lock 시 푸시 모드(콘텐츠 오른쪽으로 밀림)</p>
          {children}
        </MainContent>
      </BodyContainer>

      <Footer />
    </OuterContainer>
  );
}

export default Layout;
