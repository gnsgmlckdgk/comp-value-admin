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
  margin-top: 60px; /* Header가 position: fixed; height:60px라 가정 */

  @media (max-width: 768px) {
    /* 작은 화면에서 필요 시 여백 조정 */
    margin-top: 60px;
  }
`;

export const MainContent = styled.main`
  flex: 1; /* 사이드바의 폭을 제외한 나머지 공간 */
  background-color: #f0f1f6;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const HoverTrigger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  background: transparent;
  z-index: 100;
`;
