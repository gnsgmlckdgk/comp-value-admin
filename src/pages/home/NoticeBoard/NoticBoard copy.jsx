// NoticeBoard.jsx
import React, { useState, useEffect } from 'react';
import { send } from '../../../components/util/clientUtil'

/**
 * 공시정보 조회
 * @returns 
 */
const getDisclosureList = async () => {
    const params = {
        "corp_code": "",
        "bgn_de": "20200117",
        "end_de": "20200417",
        "last_reprt_at": "",
        "pblntf_ty": "",
        "pblntf_detail_ty": "",
        "corp_cls": "Y",
        "sort": "",
        "sort_mth": "",
        "page_no": "1",
        "page_count": "10"
    };
    const response = await send("http://localhost:18080/dart/disclosure/disc/list", params, "POST");
    return response.data;
}

const NoticeBoard = () => {

    useEffect(() => {
        // 이 안의 로직이 컴포넌트가 마운트되거나,
        // 의존성 배열에 있는 값들이 변경될 때마다 실행됨
        const fetchData = async () => {
            try {
                const list = await getDisclosureList();
                setNoticeList(list);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        fetchData();
    }, []); // 처음 마운트될 때 최초값

    console.log("noticeList", noticeList.list);

    // 실제 데이터는 서버에서 받아올 수도 있음
    const _noticeList = [
        { id: 1, title: '신규 상장 기업 안내', date: '2025-01-29', content: 'OO 기업이 신규 상장되었습니다.' },
        { id: 2, title: '업데이트 예정 안내', date: '2025-02-05', content: '다음 달에 기업 가치 예측 기능이 업데이트될 예정입니다.' },
    ];

    return (
        <div style={{ marginTop: '24px' }}>
            <h2>공지사항</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {_noticeList.map(notice => (
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
