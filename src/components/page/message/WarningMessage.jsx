import React from 'react';
import styled from 'styled-components';

const WarningMessageStyled = styled.div`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #ffe6e6;
  color: #d8000c;
  border: 1px solid #d8000c;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
`;

const WarningMessage = ({ message }) => {

  return (
    <WarningMessageStyled>{message}</WarningMessageStyled>
  )

}

export default WarningMessage;