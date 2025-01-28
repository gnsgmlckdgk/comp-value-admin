import styled from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const BodyContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  margin-top: 60px; /* Header가 position: fixed; height:60px이라 가정 */
  /* 
    locked 모드(푸시)일 때만 사이드바가 flex 아이템으로 공간을 차지.
    오버레이 모드일 때는 사이드바가 absolute로 떠서 메인 콘텐츠는 flex:1로 전부 사용
  */
`;

export const MainContent = styled.main`
  flex: 1; /* 잠금 모드에서 사이드바의 폭을 제외한 나머지 공간 */
  background-color: #f0f1f6;
  padding: 20px;
  box-sizing: border-box;
`;


export const HoverTrigger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  background: transparent;
  z-index: 100;
  /* 마우스 진입 시 isOpen=true */
`;
