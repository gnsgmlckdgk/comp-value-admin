import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import BoardContainer from '../../components/common/board/BoardContainer';
import FormWrapper from '../../components/common/board/form/FormWrapper';
import FormInput from '../../components/common/board/form/FormInput';
import FormContents from '../../components/common/board/form/FormContents';
import ButtonColBox from '../../components/common/board/btn/ButtonColBox';
import ActionButton from '../../components/common/board/btn/ActionButton';
import CancelButton from '../../components/common/board/btn/CancelButton';

import { send } from '../../components/util/clientUtil';


function BoardRegisterPage() {
    // 폼 입력 상태 변수
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // 서버 URL (호스트에 따라 분기)
    const sendUrl = useMemo(
        () =>
            window.location.hostname === 'localhost'
                ? 'http://localhost:18080/dart/freeboard/regi'
                : '/dart/freeboard/regi',
        []
    );

    // 폼 제출 핸들러 (useCallback으로 재생성 최소화)
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const { data, error } = await send(sendUrl, { title, author, content }, 'POST');
                if (data) {
                    alert('게시글이 등록되었습니다.');
                } else {
                    console.error('Error:', error);
                    alert(error);
                }
            } catch (err) {
                console.error('Submit error:', err);
                alert('게시글 등록 중 오류가 발생했습니다.');
            }
            navigate('/freeBoard');
        },
        [title, author, content, navigate, sendUrl]
    );

    return (
        <BoardContainer
            titleFlag={true}
            title='게시글 작성'
        >
            <FormWrapper handleSubmit={handleSubmit}>
                <FormInput>
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요" />
                </FormInput>
                <FormInput>
                    <label>작성자</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="작성자를 입력하세요"
                    />
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