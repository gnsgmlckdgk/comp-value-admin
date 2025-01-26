import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = styled.nav`
 grid-area: sidebar;
 background: #f5f5f5;
 padding: 20px;
`;

function SidebarLayout() {
    return (
        <>
            <Sidebar>
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/cal/compvalue">기업가치계산</Link></li>
                </ul>
            </Sidebar>
        </>
    )
}

export default SidebarLayout;