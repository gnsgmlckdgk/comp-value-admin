import React from 'react';
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
                    <li>Menu 1</li>
                    <li>Menu 2</li>
                    <li>Menu 3</li>
                </ul>
            </Sidebar>
        </>
    )
}

export default SidebarLayout;