import React from 'react';
import styled from 'styled-components';



const FormInputSt = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const FormInput = ({ children }) => {

  return (
    <FormInputSt>
      {children}
    </FormInputSt>
  )
}

export default FormInput;