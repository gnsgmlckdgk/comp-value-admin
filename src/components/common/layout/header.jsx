import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
 grid-area: header;
 background: #333;
 color: white;
 display: flex;
 align-items: center;
 padding: 0 20px;
`;

function HeaderLayout() {
    return (
        <>
            <Header>
                <h1>Logo</h1>
            </Header>
        </>
    )
}

export default HeaderLayout;