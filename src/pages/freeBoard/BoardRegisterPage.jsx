import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import BoardContainer from '@components/board/BoardContainer';
import FormWrapper from '@components/form/FormWrapper';
import FormInput from '@components/form/FormInput';
import FormContents from '@components/form/FormContents';
import ButtonColBox from '@components/btn/ButtonColBox';
import ActionButton from '@components/btn/ActionButton';
import CancelButton from '@components/btn/CancelButton';

import { send } from '@utils/clientUtil';
import { ROUTES } from '@config/routes';
import { GET_HOST, API_CONFIG } from '@config/apiConfig'

function BoardRegisterPage() {
    // 폼 입력 상태 변수
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // 서버 URL (호스트에 따라 분기)
    const sendUrl = useMemo(
        () =>
            `${GET_HOST()}${API_CONFIG.BOARD.FREEBOARD.REGISTER.URL}`,
        []
    );

    // 폼 제출 핸들러 (useCallback으로 재생성 최소화)
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const { data, error } = await send(sendUrl, { title, author, content }, API_CONFIG.BOARD.FREEBOARD.REGISTER.METHOD);
                if (data) {
                    alert('게시글이 등록되었습니다.');
                    navigate(`${ROUTES.BOARD_FREEBOARD}`);
                } else {
                    console.error('Error:', error);
                    alert(error);
                }
            } catch (err) {
                console.error('Submit error:', err);
                alert('게시글 등록 중 오류가 발생했습니다.');
            }


        },
        [title, author, content, navigate, sendUrl]
    );

    return (
        <BoardContainer
            titleFlag={true}
            title='게시글 작성'
        >
            <FormWrapper handleSubmit={handleSubmit}>
                <FormInput
                    label="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type='text'
                    placeholder='제목을 입력하세요'>
                </FormInput>
                <FormInput
                    label='작성자'
                    type='text'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="작성자를 입력하세요.">
                </FormInput>
                <FormContents label='내용' labelFlag={true} content={content} setContent={setContent} />

                <ButtonColBox gap='3px' flexWrap='wrap' sort='right'>
                    <ActionButton btnNm='등록' />
                    <CancelButton btnNm='취소' onClick={() => navigate(-1)} />
                </ButtonColBox>

            </FormWrapper>
        </BoardContainer>

    );
}

export default BoardRegisterPage;