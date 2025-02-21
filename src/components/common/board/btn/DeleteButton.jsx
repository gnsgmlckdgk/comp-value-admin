import React from 'react';
import styled from 'styled-components';

const DeleteButtonSt = styled(ActionButton)`
  background: linear-gradient(135deg, #dc3545, #c82333);
`;


const DeleteButton = ({ btnNm, onClick }) => {

    return (
        <DeleteButtonSt type="button" {...(onClick ? { onClick } : {})}>
            {btnNm}
        </DeleteButtonSt>
    );
}

export default DeleteButton;