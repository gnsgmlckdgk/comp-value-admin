import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Title, ActionButton, EditButton, DeleteButton } from './styles/styles';


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

const ViewButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;


const BoardView = ({ post, ebtnOnClicked, delBtnOnClicked, backBtnOnClicked }) => {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Title>{post.title}</Title>
            <MetaInfo>
                <div><strong>작성자:</strong> {post.author}</div>
                <div><strong>작성일:</strong> {post.createdAt}</div>
            </MetaInfo>
            <PostCard>
                {/* XSS 방지(dangerouslySetInnerHTML: html 코드 해석출력, DOMpurify.santize: XSS 검증 */}
                <ContentArea dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
                <ViewButtonContainer>
                    <EditButton onClick={ebtnOnClicked}>수정</EditButton>
                    <DeleteButton onClick={delBtnOnClicked}>삭제</DeleteButton>
                </ViewButtonContainer>
            </PostCard>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <ActionButton onClick={backBtnOnClicked}>뒤로가기</ActionButton>
            </div>
        </motion.div>
    )
}

export default BoardView;


