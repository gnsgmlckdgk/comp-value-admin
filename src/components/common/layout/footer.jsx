import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
 grid-area: footer;
 background: #333;
 color: white;
 display: flex;
 align-items: center;
 justify-content: center;
`;

function FooterLayout() {
    return (
        <>
            <Footer>
                <p>Footer Content</p>
            </Footer>
        </>
    )
}

export default FooterLayout;