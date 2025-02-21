// File: styles.js
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

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

/* 추가: Pagination 스타일 */
export const PaginationContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const PaginationButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: ${({ $active }) => ($active ? '#007bff' : '#ccc')};
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background: ${({ $active }) => ($active ? '#0056b3' : '#999')};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.2;
      cursor: not-allowed;
      &:hover {
        background-color: ${({ active }) => (active ? '#007BFF' : '#fff')};
      }
    `}

`;


/* 추가: Warning 메시지 */
export const WarningMessage = styled.div`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #ffe6e6;
  color: #d8000c;
  border: 1px solid #d8000c;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
`;

/* 추가: 삭제 확인 모달 스타일 */
export const ConfirmModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ConfirmModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

export const ConfirmModalTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 16px;
`;

export const ConfirmModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
`;

export const ConfirmButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #28a745, #218838);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #dc3545, #c82333);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

// 추가: ActionButton 스타일 컴포넌트
export const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

export const EditButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #17a2b8, #117a8b);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

// 삭제 버튼용 DeleteButton
export const DeleteButton = styled(ActionButton)`
  background: linear-gradient(135deg, #dc3545, #c82333);
`;