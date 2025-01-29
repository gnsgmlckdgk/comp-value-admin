// StatCard.jsx
import React from 'react';

function StatCard({ title, value, description }) {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '200px',
            textAlign: 'center',
            backgroundColor: '#fff',
        }}>
            <h2 style={{ margin: '0 0 8px 0' }}>{title}</h2>
            <p style={{ fontSize: '24px', margin: '0 0 4px 0', fontWeight: 'bold' }}>{value}</p>
            <span style={{ color: '#888' }}>{description}</span>
        </div>
    );
}

export default StatCard;
