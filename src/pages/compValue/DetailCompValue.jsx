import React, { useState } from 'react';

/**
 * 상세 정보를 토글할 수 있는 컴포넌트
 * @param {Object[]} details - 표시할 상세 정보 배열
 * @param {number} details[].id - 각 항목의 고유 ID
 * @param {string} details[].title - 항목의 제목
 * @param {string} details[].content - 항목의 상세 내용
 * @param {Object} containerStyle - 추가적인 스타일 정보
 */

// 상수 스타일 (필요시 수정)
const containerClass = "w-full max-w-md mx-auto p-4";

const toggleButtonStyle = {
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
};

const detailsContainerStyle = {
    marginTop: '8px',
    padding: '16px',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
};

const listStyle = { listStyle: 'none', padding: 0, margin: 0 };

const listItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
    gap: '16px'
};

const titleStyle = {
    fontWeight: 500,
    minWidth: '150px'
};

const contentStyle = {
    color: '#4b5563',
    flex: 1
};

const noDataStyle = {
    marginTop: '8px',
    padding: '16px',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#6b7280'
};

const DetailsToggle = ({ details = [], containerStyle = {} }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetails = () => setIsOpen(!isOpen);

    return (
        <div className={containerClass} style={containerStyle}>
            <button onClick={toggleDetails} style={toggleButtonStyle}>
                상세정보
            </button>

            {isOpen && (
                details.length > 0 ? (
                    <div style={detailsContainerStyle}>
                        <ul style={listStyle}>
                            {details.map(item => (
                                <li key={item.id} style={listItemStyle}>
                                    <span style={titleStyle}>{item.title}</span>
                                    <span style={contentStyle}>
                                        {(typeof item.content === 'number' || !isNaN(item.content))
                                            ? Number(item.content).toLocaleString()
                                            : item.content}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div style={noDataStyle}>
                        데이터가 없습니다.
                    </div>
                )
            )}
        </div>
    );
};

export default DetailsToggle;
