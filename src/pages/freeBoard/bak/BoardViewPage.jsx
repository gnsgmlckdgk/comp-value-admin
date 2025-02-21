import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BoardContainer, Title } from './styles/styles';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import DOMPurify from 'dompurify';

import { send } from '../../components/util/clientUtil';
import LoadingOverlayComp from '../../components/common/ui/LoadingOverlay';
import { formatTimestamp } from '../../components/util/DateUtil';


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

const BoardViewPage = () => {
  // location.state로 전달된 값 (없으면 기본값 사용)
  const { currentPage = 1, sgubun = '0', searchText = '' } = useLocation().state || {};
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPost = useCallback(
    async (id) => {
      const sendUrl =
        window.location.hostname === 'localhost'
          ? `http://localhost:18080/dart/freeboard/view/${id}`
          : `/dart/freeboard/view/${id}`;

      try {
        const { data, error } = await send(sendUrl, {});
        if (data) {
          data.createdAt = formatTimestamp(data.createdAt);
          data.updatedAt = formatTimestamp(data.updatedAt);
          return data;
        } else {
          console.error('Error fetching post:', error);
          return null;
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setIsLoading(true);
      const fetchedPost = await getPost(id);
      setPost(fetchedPost);
      setIsLoading(false);
    };

    fetchPost();
  }, [id, getPost]);

  const handleDelete = useCallback(async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      // 실제 삭제 API 호출 로직 추가 가능
      const sendUrl =
        window.location.hostname === 'localhost'
          ? `http://localhost:18080/dart/freeboard/delete/${id}`
          : `/dart/freeboard/delete/${id}`;

      setIsLoading(true);
      await send(sendUrl, {}, 'DELETE');
      alert("삭제되었습니다.");
      setIsLoading(false);

      // navigate(-1);
      navigate(`/freeBoard`, {
        state: {
          currentPage,
          sgubun,
          searchText
        }
      });
    }
  }, [navigate]);

  if (isLoading) {
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

  return (
    <BoardContainer>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title>{post.title}</Title>
        <MetaInfo>
          <div>
            <strong>작성자:</strong> {post.author}
          </div>
          <div>
            <strong>작성일:</strong> {post.createdAt}
          </div>
        </MetaInfo>
        <PostCard>
          {/* XSS 방지: DOMPurify로 sanitize 후 렌더링 */}
          <ContentArea
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
          <ViewButtonContainer>
            <EditButton onClick={() => navigate(`/freeBoard/edit/${post.id}`, {
              state: {
                currentPage,
                sgubun,
                searchText
              }
            })}>
              수정
            </EditButton>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </ViewButtonContainer>
        </PostCard>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <ActionButton
            onClick={() =>
              navigate('/freeBoard', {
                state: { currentPage, sgubun, searchText },
              })
            }
          >
            뒤로가기
          </ActionButton>
        </div>
      </motion.div>
    </BoardContainer>
  );
};

export default BoardViewPage;