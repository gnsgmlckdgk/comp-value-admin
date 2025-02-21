import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import BoardView from '../../components/common/board/BoardView';

import { send } from '../../components/util/clientUtil';
import LoadingOverlayComp from '../../components/common/ui/LoadingOverlay';
import { formatTimestamp } from '../../components/util/DateUtil';



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
      alert("삭제되었습니다.")
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

  return (
    <BoardView
      post={post}
      ebtnOnClicked={() => navigate(`/freeBoard/edit/${post.id}`, {
        state: {
          currentPage,
          sgubun,
          searchText
        }
      })}
      delBtnOnClicked={handleDelete}
      backBtnOnClicked={() =>
        navigate('/freeBoard', {
          state: { currentPage, sgubun, searchText },
        })
      }>
    </BoardView>
  );
};

export default BoardViewPage;