import React from 'react';
import styled from 'styled-components';


const EditButtonSt = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #17a2b8, #117a8b);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;


const EditButton = ({ btnNm, onClick }) => {

    return (
        <EditButtonSt {...(onClick ? { onClick } : {})} >{btnNm}</EditButtonSt>
    );
}

export default EditButton;