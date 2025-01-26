import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // 화살표 아이콘을 위한 라이브러리

/**
 * 상세 정보를 토글할 수 있는 컴포넌트
 * @param {Object[]} details - 표시할 상세 정보 배열
 * @param {number} details[].id - 각 항목의 고유 ID
 * @param {string} details[].title - 항목의 제목
 * @param {string} details[].content - 항목의 상세 내용
 * @param {Object} containerstyle - 추가적인 스타일 정보
 */
const DetailsToggle = ({ details = [], containerStyle = {} }) => {

    // 토글 상태를 관리하는 state
    const [isOpen, setIsOpen] = useState(false);

    return (
        // containerStyle로 받은 스타일정보 설정
        <div className="w-full max-w-md mx-auto p-4" style={{ ...containerStyle }}>
            {/* 토글 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    fontSize: '15px'
                }}
            >상세정보</button>

            {/* 토글이 열린 상태일 때만 상세 내용 표시 */}
            {isOpen && details?.length > 0 && (
                <div style={{
                    marginTop: '8px',
                    padding: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {details.map(item => (
                            <li key={item.id} style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                padding: '12px 0',
                                borderBottom: '1px solid #e2e8f0',
                                gap: '16px'
                            }}>
                                <span style={{
                                    fontWeight: 500,
                                    minWidth: '150px',
                                }}>{item.title}</span>
                                <span style={{
                                    color: '#4b5563',
                                    flex: 1
                                }}>{(typeof item.content === 'number' || !isNaN(item.content)) ? Number(item.content).toLocaleString() : item.content}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isOpen && (!details || details.length === 0) && (
                <div style={{
                    marginTop: '8px',
                    padding: '16px',
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#6b7280'
                }}>
                    데이터가 없습니다.
                </div>
            )}
        </div>
    );
};

export default DetailsToggle;