// File: components/BoardRegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BoardContainer, Title, FormWrapper, FormGroup, ButtonContainer } from './styles/styles';
import { motion } from 'framer-motion';
// import ReactQuill from 'react-quill';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css'; // react-quill 스타일
import 'react-quill/dist/quill.bubble.css'; // bubble 테마 스타일


const StyledReactQuill = styled(ReactQuill)`
  /* 편집 영역의 테두리와 둥근 모서리 지정 */
  .ql-container {
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  /* 에디터 내부 글자 크기와 최소 높이 지정 */
  .ql-editor {
    font-size: 1.1rem;
    min-height: 300px;
  }

  /* 툴바 배경색 등 추가 스타일 적용 */
  .ql-toolbar {
    background-color: #f8f9fa;
  }
`;

const ActionButton = styled.button`
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

const CancelButton = styled(ActionButton)`
  background: linear-gradient(135deg, #6c757d, #5a6268);
`;


function BoardRegisterPage() {
    // 폼 입력값을 관리하는 state 변수들
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // 폼 제출 시 호출되는 함수
    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: 여기에 백엔드와 통신하는 로직을 추가하세요.
        // 예: axios.post('/api/boards', { title, author, content })
        // 이곳에 로딩창을 보여주는 코드를 삽입할 수 있습니다.

        console.log('등록된 데이터:', { title, author, content });
        alert('게시글이 등록되었습니다.');
        navigate('/freeBoard');
    };

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
                        {/* react-quill 에디터를 사용하여 내용 입력 */}
                        <StyledReactQuill theme="snow" value={content} onChange={setContent} />
                    </FormGroup>
                    <ButtonContainer>
                        <ActionButton type='submit'>
                            등록
                        </ActionButton>
                        <CancelButton type="button" onClick={() => navigate(-1)}>취소</CancelButton>
                    </ButtonContainer>
                </FormWrapper>
            </motion.div>
        </BoardContainer>
    );
}

export default BoardRegisterPage;
