// QuickLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function QuickLinks() {
    const links = [
        { path: '/complist', title: '기업목록' },
        { path: '/compvalue', title: '기업가치' },
    ];

    return (
        <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '24px'
        }}>
            {links.map((link) => (
                <Link
                    key={link.title}
                    to={link.path}
                    style={{
                        display: 'block',
                        padding: '16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        backgroundColor: '#f5f5f5',
                        width: '150px',
                        textAlign: 'center',
                        color: '#333'
                    }}
                >
                    {link.title}
                </Link>
            ))}
        </div>
    );
}

export default QuickLinks;
