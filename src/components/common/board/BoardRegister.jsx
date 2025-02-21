import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { BoardContainer, FormWrapper, FormGroup, Title, ButtonContainer, ActionButton, CancelButton } from './styles/styles';
import styled from 'styled-components';


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

const BoardRegister = ({ handleSubmit, setTitle, setAuthor, setContent, title, content, author }) => {

  const navigate = useNavigate();

  return (
    <BoardContainer>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title>게시글 등록</Title>
        <FormWrapper onSubmit={handleSubmit}>
          <FormGroup>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </FormGroup>
          <FormGroup>
            <label>작성자</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작성자를 입력하세요"
            />
          </FormGroup>
          <FormGroup>
            <label>내용</label>
            <StyledReactQuill theme="snow" value={content} onChange={setContent} />
          </FormGroup>
          <ButtonContainer>
            <ActionButton type="submit">등록</ActionButton>
            <CancelButton type="button" onClick={() => navigate(-1)}>
              취소
            </CancelButton>
          </ButtonContainer>
        </FormWrapper>
      </motion.div>
    </BoardContainer>
  );
}

export default BoardRegister;