import styled from 'styled-components';

const Form = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Input = styled.input`
 width: 96%;
 padding: 10px;
 margin: 8px 0;
 border: 1px solid #ddd;
 border-radius: 4px;
`;

const Button = styled.button`
 width: 100%;
 padding: 12px;
 background-color: #007bff;
 color: white;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 margin-top: 20px;

 &:hover {
   background-color: #0056b3;
 }
`;

const ResultMessage = styled.div`
 margin-top: 20px;
 padding: 15px;
 border-radius: 4px;
 background-color: #f8f9fa;
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const StrongText = styled.span`
  font-weight: bolder;
  cursor: pointer;
  &:hover {
   color:rgb(38, 28, 224);
   font-size: 200%;
 }
`;

export { Form, Input, Button, ResultMessage, StrongText }