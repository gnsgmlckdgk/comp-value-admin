// HomeDashboard.jsx
import React from 'react';
import StatCard from './StatCard';

function HomeDashboard() {
    // 실제 데이터는 props나 API 호출 등을 통해 받아올 수 있음
    const totalCompanies = 120;
    const averageValue = '3조';
    const newCompanies = 5;
    const topValueCompany = '가치가 제일 높은 기업';

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '16px',
            margin: '16px 0'
        }}>
            <StatCard
                title="기업 총 개수"
                value={totalCompanies}
                description="전체 등록된 기업 수"
            />
            <StatCard
                title="평균 기업 가치"
                value={averageValue}
                description="대략적인 평균 가치"
            />
            <StatCard
                title="신규 등록 기업"
                value={`${newCompanies}개`}
                description="오늘/최근 등록"
            />
            <StatCard
                title="Top 1 기업"
                value={topValueCompany}
                description="현재 최고 가치 기업"
            />
        </div>
    );
}

export default HomeDashboard;
