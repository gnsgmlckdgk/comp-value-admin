import React from 'react';
import styled from 'styled-components';

const CancelButtonSt = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #dc3545, #c82333);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = ({ btnNm, onClick }) => {

    return (
        <CancelButtonSt type="button" {...(onClick ? { onClick } : {})}>
            {btnNm}
        </CancelButtonSt>
    );
}

export default CancelButton;