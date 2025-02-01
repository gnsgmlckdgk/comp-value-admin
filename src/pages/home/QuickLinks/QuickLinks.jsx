// QuickLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from "../../../config/menuConfig";

function QuickLinks() {

    const links = menuItems;

    return (
        <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '24px'
        }}>
            {links.map((link) => (
                <Link
                    key={link.path}
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
                    {link.label}
                </Link>
            ))}
        </div>
    );
}

export default QuickLinks;
