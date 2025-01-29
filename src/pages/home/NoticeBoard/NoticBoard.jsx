// NoticeBoard.jsx
import React from 'react';

function NoticeBoard() {
    // 실제 데이터는 서버에서 받아올 수도 있음
    const noticeList = [
        { id: 1, title: '신규 상장 기업 안내', date: '2025-01-29', content: 'OO 기업이 신규 상장되었습니다.' },
        { id: 2, title: '업데이트 예정 안내', date: '2025-02-05', content: '다음 달에 기업 가치 예측 기능이 업데이트될 예정입니다.' },
    ];

    return (
        <div style={{ marginTop: '24px' }}>
            <h2>공지사항</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {noticeList.map(notice => (
                    <li key={notice.id} style={{ marginBottom: '16px' }}>
                        <strong style={{ display: 'block', marginBottom: '4px' }}>
                            {notice.title} <span style={{ fontWeight: 'normal', color: '#777', marginLeft: '8px' }}>({notice.date})</span>
                        </strong>
                        <p style={{ margin: 0 }}>{notice.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NoticeBoard;
