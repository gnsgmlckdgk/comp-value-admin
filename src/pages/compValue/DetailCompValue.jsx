import React, { useState } from 'react';
import styled from 'styled-components';

// Container: 전체 래퍼. Tailwind 클래스 대신 styled-components로 구현
const Container = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 600px) {
    padding: 0.75rem;
  }
`;

// ToggleButton: 상세정보 토글 버튼
const ToggleButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  cursor: pointer;
  font-size: 15px;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px;
  }
`;

// DetailsContainer: 상세 정보 컨테이너
const DetailsContainer = styled.div`
  margin-top: 8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

// List: 상세정보 목록 (ul)
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// ListItem: 각 항목 (li)
const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

// Title: 항목 제목
const Title = styled.span`
  font-weight: 500;
  min-width: 150px;

  @media (max-width: 600px) {
    min-width: auto;
  }
`;

// Content: 항목 내용
const Content = styled.span`
  color: #4b5563;
  flex: 1;
  word-break: break-word;
`;

// NoData: 데이터 없을 경우 표시 영역
const NoData = styled.div`
  margin-top: 8px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
  color: #6b7280;

  @media (max-width: 600px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const DetailsToggle = ({ details = [], containerStyle = {} }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetails = () => setIsOpen(!isOpen);

    return (
        <Container style={containerStyle}>
            <ToggleButton onClick={toggleDetails}>
                상세정보
            </ToggleButton>

            {isOpen && (
                details.length > 0 ? (
                    <DetailsContainer>
                        <List>
                            {details.map(item => (
                                <ListItem key={item.id}>
                                    <Title>{item.title}</Title>
                                    <Content>
                                        {(typeof item.content === 'number' || !isNaN(item.content))
                                            ? Number(item.content).toLocaleString()
                                            : item.content}
                                    </Content>
                                </ListItem>
                            ))}
                        </List>
                    </DetailsContainer>
                ) : (
                    <NoData>
                        데이터가 없습니다.
                    </NoData>
                )
            )}
        </Container>
    );
};

export default DetailsToggle;
