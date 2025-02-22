// import React, { useState, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { BoardContainer, Title, FormWrapper, FormGroup, ButtonContainer } from './styles/styles';
// import { motion } from 'framer-motion';
// import ReactQuill from 'react-quill-new';
// import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
// import { send } from '../../components/util/clientUtil';

// const StyledReactQuill = styled(ReactQuill)`
//   .ql-container {
//     border: 1px solid #ddd;
//     border-radius: 4px;
//   }

//   .ql-editor {
//     font-size: 1.1rem;
//     min-height: 300px;
//   }

//   .ql-toolbar {
//     background-color: #f8f9fa;
//   }
// `;

// const ActionButton = styled.button`
//   padding: 8px 16px;
//   border: none;
//   border-radius: 4px;
//   background: linear-gradient(135deg, #007bff, #0056b3);
//   color: #fff;
//   cursor: pointer;
//   font-size: 1rem;
//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const CancelButton = styled(ActionButton)`
//   background: linear-gradient(135deg, #6c757d, #5a6268);
// `;

// function BoardRegisterPage() {
//     // 폼 입력 상태 변수
//     const [title, setTitle] = useState('');
//     const [author, setAuthor] = useState('');
//     const [content, setContent] = useState('');
//     const navigate = useNavigate();

//     // 서버 URL (호스트에 따라 분기)
//     const sendUrl = useMemo(
//         () =>
//             window.location.hostname === 'localhost'
//                 ? 'http://localhost:18080/dart/freeboard/regi'
//                 : '/dart/freeboard/regi',
//         []
//     );

//     // 폼 제출 핸들러 (useCallback으로 재생성 최소화)
//     const handleSubmit = useCallback(
//         async (e) => {
//             e.preventDefault();
//             try {
//                 const { data, error } = await send(sendUrl, { title, author, content }, 'POST');
//                 if (data) {
//                     alert('게시글이 등록되었습니다.');
//                 } else {
//                     console.error('Error:', error);
//                     alert(error);
//                 }
//             } catch (err) {
//                 console.error('Submit error:', err);
//                 alert('게시글 등록 중 오류가 발생했습니다.');
//             }
//             navigate('/freeBoard');
//         },
//         [title, author, content, navigate, sendUrl]
//     );

//     return (
//         <BoardContainer>
//             <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <Title>게시글 등록</Title>
//                 <FormWrapper onSubmit={handleSubmit}>
//                     <FormGroup>
//                         <label>제목</label>
//                         <input
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             placeholder="제목을 입력하세요"
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label>작성자</label>
//                         <input
//                             type="text"
//                             value={author}
//                             onChange={(e) => setAuthor(e.target.value)}
//                             placeholder="작성자를 입력하세요"
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label>내용</label>
//                         <StyledReactQuill theme="snow" value={content} onChange={setContent} />
//                     </FormGroup>
//                     <ButtonContainer>
//                         <ActionButton type="submit">등록</ActionButton>
//                         <CancelButton type="button" onClick={() => navigate(-1)}>
//                             취소
//                         </CancelButton>
//                     </ButtonContainer>
//                 </FormWrapper>
//             </motion.div>
//         </BoardContainer>
//     );
// }

// export default BoardRegisterPage;