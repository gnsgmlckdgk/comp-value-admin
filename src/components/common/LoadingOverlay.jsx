import React from 'react';
import styled, { keyframes } from 'styled-components';

// 애니메이션 키프레임 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 로딩 오버레이 스타일
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 스피너 스타일
const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

/**
 * LoadingOverlay 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isLoadingFlag - 로딩 상태 플래그 (true이면 로딩 오버레이 표시)
 */
const LoadingOverlay = ({ isLoadingFlag = false }) => {

  if (!isLoadingFlag) return (<></>);

  return (
    <Overlay>
      <Spinner />
    </Overlay>
  );
};

export default LoadingOverlay;
