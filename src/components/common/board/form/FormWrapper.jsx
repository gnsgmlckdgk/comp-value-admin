import React from 'react';
import styled from 'styled-components';

const FormWrapperSt = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormWrapper = ({ children, handleSubmit }) => {
    return (
        <FormWrapperSt onSubmit={handleSubmit}>
            {children}
        </FormWrapperSt>
    )
}

export default FormWrapper;