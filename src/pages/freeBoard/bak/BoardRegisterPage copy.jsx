import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import BoardRegister from '../../components/common/board/BoardRegister';
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
        <BoardRegister
            handleSubmit={handleSubmit}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setContent={setContent}
            title={title}
            content={content}
            author={author}></BoardRegister>
    );
}

export default BoardRegisterPage;