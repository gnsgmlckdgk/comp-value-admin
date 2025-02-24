import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BoardContainerSt = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 2rem;
  text-align: center;
  color: #181a31;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;


const BoardContainer = ({ children, title = '', titleFlag = false }) => {


  return (
    <BoardContainerSt>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {titleFlag && <Title>{title}</Title>}
        {children}
      </motion.div>
    </BoardContainerSt>
  );


}

export default BoardContainer;