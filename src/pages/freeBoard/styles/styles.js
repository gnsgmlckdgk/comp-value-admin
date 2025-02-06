// File: styles.js
import styled from 'styled-components';

export const BoardContainer = styled.div`
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

export const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 1.5rem;
  text-align: center;
  color: #181a31;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const ResetButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #6c757d, #495057);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

export const ErrorText = styled.div`
  margin-top: 4px;
  font-size: 0.85rem;
  color: red;
`;

export const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

export const SubFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

export const SubFormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 4px;
    font-size: 0.9rem;
  }

  input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`;

export const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
`;
