import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { send } from '@utils/clientUtil';

import { formatTimestamp } from '@utils/DateUtil';
import LoadingOverlayComp from '../../components/page/ui/LoadingOverlay';

import BoardContainer from '@components/board/BoardContainer';
import FormWrapper from '@components/form/FormWrapper';
import FormInput from '@components/form/FormInput';
import FormContents from '@components/form/FormContents';
import ButtonColBox from '@components/btn/ButtonColBox';
import ActionButton from '@components/btn/ActionButton'
import CancelButton from '@components/btn/CancelButton';

import { ROUTES } from '@config/routes'
import { GET_HOST, API_CONFIG } from '@config/apiConfig'


function BoardEditPage() {
    const location = useLocation();
    const {
        currentPage,
        sgubun,
        searchText
    } = location.state || {};

    const { id } = useParams(); // 수정할 게시글의 ID
    const navigate = useNavigate();

    // 상태 변수들
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState('');

    // 서버 URL (호스트에 따라 분기)
    const sendUrl = useMemo(
        () =>
            `${GET_HOST()}${API_CONFIG.BOARD.FREEBOARD.EDIT.URL}`,
        []
    );

    // 게시글 데이터를 불러오는 함수 (현재는 setTimeout으로 모의)
    const fetchBoardData = useCallback(() => {

        const getBoardSendUrl = `${GET_HOST()}${API_CONFIG.BOARD.FREEBOARD.VIEW.URL}/${id}`;

        (async () => {
            try {
                setIsLoading(true);
                const { data, error } = await send(getBoardSendUrl, {}, API_CONFIG.BOARD.FREEBOARD.VIEW.METHOD);
                setIsLoading(false);

                if (data) {
                    data.createdAt = formatTimestamp(data.createdAt);
                    data.updatedAt = formatTimestamp(data.updatedAt);

                    setTitle(data.title);
                    setAuthor(data.author);
                    setContent(data.content);

                    return data;
                } else {
                    console.error('Error fetching post:', error);
                    return null;
                }
            } catch (err) {
                console.error('Error fetching post:', err);
                return null;
            }
        })();
    }, []);

    // 컴포넌트 마운트 시 기존 게시글 데이터를 로드
    useEffect(() => {
        fetchBoardData();
    }, [id, fetchBoardData]);

    // 게시글 수정 폼 제출 핸들러
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            setIsLoading(true);
            const result = await send(sendUrl, { id, title, author, content }, API_CONFIG.BOARD.FREEBOARD.EDIT.METHOD);
            alert('게시글이 수정되었습니다.');
            setIsLoading(false);

            navigate(`${ROUTES.BOARD_FREEBOARD_VIEW.replace(':id', id)}`, {
                state: {
                    currentPage,
                    sgubun,
                    searchText
                }
            });
        },
        [id, title, author, content, navigate]
    );

    if (isLoading) {
        return <LoadingOverlayComp isLoadingFlag={isLoading} />;
    }

    return (
        <BoardContainer title='게시글 수정' titleFlag={true}>

            <FormWrapper handleSubmit={handleSubmit}>
                <FormInput label='제목' type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력하세요.' />
                <FormInput label='작성자' type='text' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='작성자를 입력하세요.' />
                <FormContents label='내용' content={content} setContent={setContent} />
                <ButtonColBox gap='6px' sort='right'>
                    <ActionButton btnNm='수정' />
                    <CancelButton btnNm='취소' onClick={() => navigate(-1)}></CancelButton>
                </ButtonColBox>
            </FormWrapper>

        </BoardContainer>
    );
}

export default BoardEditPage;