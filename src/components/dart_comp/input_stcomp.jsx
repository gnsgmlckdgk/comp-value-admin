import styled from 'styled-components';

const Container = styled.div`
 max-width: 600px;
 margin: 40px auto;
 padding: 20px;
 box-shadow: 0 0 20px rgba(0,0,0,0.1);
 border-radius: 8px;
`;

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

const H1 = styled.form`
  font-weight: bolder;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 20px;
  text-align: center;
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

export { Container, Form, Input, Button, H1, ResultMessage, StrongText }