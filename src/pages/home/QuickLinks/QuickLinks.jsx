import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { menuItems } from "../../../config/menuConfig";

// 컨테이너: flex-wrap을 사용하여 여러 행으로 배치되고, 화면 크기에 따라 간격이 유지됩니다.
const QuickLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
`;

// 개별 링크 아이템: 고정된 최소 너비와 여유 공간을 부여하여 반응형 레이아웃을 구성하고,
// 호버 시 약간의 상승 효과와 그림자 효과로 세련된 느낌을 줍니다.
const QuickLinkItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-decoration: none;
  background: linear-gradient(135deg, #f0f4ff, #ffffff);
  flex: 1 1 150px;
  max-width: 200px;
  text-align: center;
  color: #333;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

function QuickLinks() {
  return (
    <QuickLinksContainer>
      {menuItems.map((link) => (
        link.show ?
          <QuickLinkItem key={link.path} to={link.path}>
            {link.label}
          </QuickLinkItem>
          : ""
      ))}
    </QuickLinksContainer>
  );
}

export default QuickLinks;
