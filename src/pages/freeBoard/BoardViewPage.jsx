import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BoardContainer, Title } from './styles/styles';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import DOMPurify from 'dompurify';

import { send } from '../../components/util/clientUtil';
import LoadingOverlayComp from '../../components/common/ui/LoadingOverlay';


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

const EditButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #17a2b8, #117a8b);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #dc3545, #c82333);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
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

// 포멧 변경
function formatTimestamp(timestamp) {
  // Date 객체 생성 (문자열 형태의 타임스탬프를 파싱)
  const date = new Date(timestamp);

  // 년, 월, 일, 시, 분, 초를 추출 (월은 0부터 시작하므로 +1)
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const HH = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  // 포맷된 문자열 반환
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

// 백엔드 대신 사용할 샘플 데이터
const sampleData = [
  { id: 1, title: '첫번째 게시글', author: '홍길동', date: '2025-01-01', content: '첫번째 게시글 내용입니다.' },
  { id: 2, title: '두번째 게시글', author: '김철수', date: '2025-01-02', content: '두번째 게시글 내용입니다.' },
  { id: 3, title: '세번째 게시글', author: '이영희', date: '2025-01-03', content: '세번째 게시글 내용입니다.' },
];

const BoardViewPage = () => {

  // navigate 로 전송한 객체는 useLocation() 으로만 받음
  const location = useLocation();
  const {
    currentPage = 1,
    sgubun = "0",
    searchText = ""
  } = location.state || {};

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getPost = async ({ id }) => {
    const sendUrl = window.location.hostname === "localhost"
      ? `http://localhost:18080/dart/freeboard/view/${id}`
      : `/dart/freeboard/view/${id}`;

    const { data, error } = await send(sendUrl, {});

    if (data) {
      // 데이터 변환
      data.createdAt = formatTimestamp(data.createdAt);
      data.updatedAt = formatTimestamp(data.updatedAt);

      return data;

    } else {
      return {};
    }
  }

  // URL의 id와 일치하는 게시글 찾기
  // const post = sampleData.find(item => item.id === Number(id));
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const fetchedPost = await getPost({ id });
      setPost(fetchedPost);
      setIsLoading(false);
    };
    if (id) {
      fetchPost();
    }
  }, [id]); // [id] 값이 변경될때마다 useEffect가 실행됨

  if (isLoading) {
    // LoadingOverlayComp 컴포넌트를 로딩 상태일 때 보여줌
    return <LoadingOverlayComp isLoadingFlag={isLoading} />;
  }


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

  // 삭제 처리 (실제 구현 시 백엔드 API 호출 추가)
  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      // 삭제 로직 실행 후 이전 페이지로 이동
      navigate(-1);
    }
  };

  return (
    <BoardContainer>
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
            <EditButton onClick={() => navigate(`/freeBoard/edit/${post.id}`)}>수정</EditButton>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </ViewButtonContainer>
        </PostCard>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <ActionButton onClick={() => navigate('/freeBoard',
            { 'state': { 'currentPage': currentPage, 'sgubun': sgubun, 'searchText': searchText } }
          )}>뒤로가기</ActionButton>
        </div>
      </motion.div>
    </BoardContainer>
  );
}

export default BoardViewPage;
