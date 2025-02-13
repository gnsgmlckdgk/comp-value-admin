// File: components/BoardListPage/ConfirmModal.jsx
import React from 'react';
import { ConfirmModalOverlay, ConfirmModalContainer, ConfirmModalTitle, ConfirmModalButtonContainer, ConfirmButton, CancelButton } from './styles/styles';

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
