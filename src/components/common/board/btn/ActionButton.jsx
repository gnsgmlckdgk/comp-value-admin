import React from 'react';
import styled from 'styled-components';


const ActionButtonSt = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;


const ActionButton = ({ btnNm }) => {

    return (
        <ActionButtonSt type="submit">{btnNm}</ActionButtonSt>
    );
}

export default ActionButton;