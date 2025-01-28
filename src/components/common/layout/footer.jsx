import React from 'react';
import styled from 'styled-components';

/* 하단 푸터 */
const FooterContainer = styled.footer`
  background: #181a31;
  color: #fff;
  text-align: center;
  padding: 10px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>© 2025 My Website. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;
