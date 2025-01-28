import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

/* 전체 페이지를 감싸는 컨테이너 */
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

/* 메인 콘텐츠 (헤더가 60px fixed이므로 위에 여백) */
const MainContent = styled.main`
  flex: 1;
  margin-top: 60px; 
  background-color: #f0f1f6; /* 밝은 배경 */
  padding: 20px;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      {/* 헤더 (fixed로 항상 상단에 노출됨) */}
      <Header />

      {/* 사이드바 (마우스 호버 시 열림) */}
      <Sidebar />

      {/* 메인 콘텐츠 */}
      <MainContent>
        <h1>메인 콘텐츠 영역</h1>
        <p>사이드바에 마우스를 가까이 가져가면 자동으로 열리고,</p>
        <p>영역 밖으로 벗어나면 자동으로 닫힙니다.</p>
        <p>헤더, 푸터, 사이드바를 각각 컴포넌트로 분리해 재사용성이 높습니다.</p>
      </MainContent>

      {/* 푸터 */}
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
