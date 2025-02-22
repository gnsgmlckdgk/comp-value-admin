import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { send } from '@utils/clientUtil';
import LoadingOverlayComp from '@components/ui/LoadingOverlay';
import { formatTimestamp } from '../../util/DateUtil';

import BoardView from '@components/board/BoardView';
import BoardContainer from '@components/board/BoardContainer';
import ButtonColBox from '@components/btn/ButtonColBox';
import EditButton from '@components/btn/EditButton';
import DeleteButton from '@components/btn/DeleteButton';

import { ROUTES } from '@config/routes'


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
      navigate(`${ROUTES.BOARD_FREEBOARD}`, {
        state: {
          currentPage,
          sgubun,
          searchText
        }
      });
    }
  }, [navigate]);

  if (isLoading || !post) {
    return <LoadingOverlayComp isLoadingFlag={isLoading} />;
  }

  // if (!post) {
  //   return <div>로딩 중...</div>;
  // }

  return (
    <BoardContainer title={post.title} titleFlag={true}>

      <BoardView post={post} backBtnOnClicked={() =>
        navigate(`${ROUTES.BOARD_FREEBOARD}`, {
          state: { currentPage, sgubun, searchText },
        })}>
        <ButtonColBox gap='16px' sort='right'>

          <EditButton btnNm='수정' onClick={() => navigate(`${ROUTES.BOARD_FREEBOARD_EDIT.replace(':id', post.id)}`, {
            state: {
              currentPage,
              sgubun,
              searchText
            }
          })} />

          <DeleteButton btnNm='삭제' onClick={handleDelete} />

        </ButtonColBox>
      </BoardView>
    </BoardContainer>
  );
};

export default BoardViewPage;