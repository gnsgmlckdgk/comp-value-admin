import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// Styled Components (공통 스타일 컴포넌트)
import {
    BoardContainer,
    Title,
    FormWrapper,
    FormGroup,
    ButtonContainer,
} from './styles/styles';

// API 호출 함수 (현재 사용하지 않지만 추후 확장 가능)
// import { send } from '../../components/util/clientUtil';

// Styled ReactQuill Component
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

// 액션 버튼 스타일
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

// 취소 버튼은 액션 버튼을 확장하여 스타일 적용
const CancelButton = styled(ActionButton)`
  background: linear-gradient(135deg, #6c757d, #5a6268);
`;

function BoardEditPage() {
    const { id } = useParams(); // 수정할 게시글의 ID
    const navigate = useNavigate();

    // 상태 변수들
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    // 게시글 데이터를 불러오는 함수 (현재는 setTimeout으로 모의)
    const fetchBoardData = useCallback(() => {
        setTimeout(() => {
            // 백엔드 API 호출 결과를 반영할 수 있도록 수정 가능
            setTitle('기존 게시글 제목');
            setAuthor('기존 작성자');
            setContent('<p>기존 게시글 내용입니다.</p>');
        }, 500);
    }, []);

    // 컴포넌트 마운트 시 기존 게시글 데이터를 로드
    useEffect(() => {
        fetchBoardData();
    }, [id, fetchBoardData]);

    // 게시글 수정 폼 제출 핸들러
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            // TODO: 백엔드 API 호출로 게시글 수정 로직 추가
            console.log('수정된 데이터:', { id, title, author, content });
            alert('게시글이 수정되었습니다.');
            navigate(`/freeBoard/view/${id}`);
        },
        [id, title, author, content, navigate]
    );

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