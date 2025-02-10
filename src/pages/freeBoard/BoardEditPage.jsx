// File: components/BoardEditPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BoardContainer, Title, FormWrapper, FormGroup, ButtonContainer } from './styles/styles';
import { motion } from 'framer-motion';
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

function BoardEditPage() {
    const { id } = useParams(); // 수정할 게시글의 ID (예: /boards/edit/:id)
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    // 예시: 컴포넌트가 마운트되면 기존 게시글 데이터를 불러온다고 가정 (실제 API 호출로 대체)
    useEffect(() => {   // 렌더링 후 실행
        // setTimeout은 비동기 데이터 fetching을 모의하기 위한 예시입니다.
        setTimeout(() => {
            // 백엔드에서 받아온 데이터를 여기에 적용하세요.
            setTitle('기존 게시글 제목');
            setAuthor('기존 작성자');
            setContent('<p>기존 게시글 내용입니다.</p>');
        }, 500);
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: 여기에 백엔드 API를 호출하여 게시글 수정 로직을 추가하세요.
        console.log('수정된 데이터:', { id, title, author, content });
        alert('게시글이 수정되었습니다.');
        navigate(`/freeBoard/view/${id}`);
    };

    return (
        <BoardContainer>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Title>게시글 수정</Title>
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
                        <ActionButton type="submit">수정</ActionButton>
                        <CancelButton type="button" onClick={() => navigate(-1)}>
                            취소
                        </CancelButton>
                    </ButtonContainer>
                </FormWrapper>
            </motion.div>
        </BoardContainer>
    );
}

export default BoardEditPage;
