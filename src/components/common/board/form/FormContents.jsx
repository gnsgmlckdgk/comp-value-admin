import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill-new';


const StyledReactQuill = styled(ReactQuill)`
  .ql-container {
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .ql-editor {
    font-size: 1.1rem;
    min-height: 300px;
  }

  .ql-toolbar {
    background-color: #f8f9fa;
  }
`;

const FormGroup = styled.div`
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

const FormContents = ({ label = '', labelFlag = false, content, setContent }) => {

  return (
    <FormGroup>
      {labelFlag && <label>{label}</label>}
      <StyledReactQuill theme="snow" value={content} onChange={setContent} />
    </FormGroup>
  )
}

export default FormContents;