import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

import styled from 'styled-components';
import { ActionButton } from '@components/btn/btnStyles/styles01';

import BoardContainer from './BoardContainer';


// BoardViewPage 전용 스타일 컴포넌트 추가
const PostCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 24px;
  border-radius: 8px;
  margin-top: 24px;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #555;
`;

const ContentArea = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 24px;
`;


const BoardView = ({ children, post, backBtnOnClicked }) => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <BoardContainer>게시글을 찾을 수 없습니다.</BoardContainer>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <ActionButton onClick={() => navigate(-1)}>뒤로가기</ActionButton>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <MetaInfo>
        <div><strong>작성자:</strong> {post.author}</div>
        <div><strong>작성일:</strong> {post.createdAt}</div>
      </MetaInfo>
      <PostCard>
        {/* XSS 방지(dangerouslySetInnerHTML: html 코드 해석출력, DOMpurify.santize: XSS 검증 */}
        <ContentArea dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
        {children}
      </PostCard>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <ActionButton onClick={backBtnOnClicked}>뒤로가기</ActionButton>
      </div>
    </>
  )
}

export default BoardView;


