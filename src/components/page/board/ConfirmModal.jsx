// File: components/BoardListPage/ConfirmModal.jsx
import React from 'react';
import styled from 'styled-components';
import { CancelButton } from '@components/btn/btnStyles/styles01';

/* 추가: 삭제 확인 모달 스타일 */
const ConfirmModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const ConfirmModalTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 16px;
`;

const ConfirmModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #28a745, #218838);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

const ConfirmModal = ({ onConfirm, onCancel, title, message, yesText, noText }) => {
  return (
    <ConfirmModalOverlay>
      <ConfirmModalContainer>
        <ConfirmModalTitle>{title}</ConfirmModalTitle>
        <div>{message}</div>
        <ConfirmModalButtonContainer>
          <ConfirmButton onClick={onConfirm}>{yesText}</ConfirmButton>
          <CancelButton onClick={onCancel}>{noText}</CancelButton>
        </ConfirmModalButtonContainer>
      </ConfirmModalContainer>
    </ConfirmModalOverlay>
  );
};

export default ConfirmModal;
