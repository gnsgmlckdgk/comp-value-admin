import styled, { css } from 'styled-components';



export const ActionButton = styled.button`
  padding: 8px 16px; /* 내부 여백 설정 */
  border: none; /* 테두리 제거 */
  border-radius: 4px; /* 모서리를 둥글게 만듦 */
  background: linear-gradient(135deg, #007bff, #0056b3); /* 파란색 그라디언트 배경 */
  color: #fff; /* 글자 색상을 흰색으로 설정 */
  cursor: pointer; /* 마우스를 올리면 클릭 가능한 포인터 모양으로 변경 */
  font-size: 1rem; /* 글자 크기 설정 */

  /* 마우스를 올렸을 때 투명도를 줄여서 색상이 약간 밝아지는 효과 */
  &:hover {
    opacity: 0.9;
  }
`;


export const CancelButton = styled.button`
  padding: 8px 16px; /* 내부 여백 설정 */
  background: linear-gradient(135deg, #dc3545, #c82333); /* 빨간색 그라디언트 배경 */
  border: none; /* 테두리 제거 */
  border-radius: 4px; /* 모서리를 둥글게 만듦 */
  color: #fff; /* 글자 색상을 흰색으로 설정 */
  cursor: pointer; /* 마우스를 올리면 포인터 모양으로 변경 */
  font-size: 1rem; /* 글자 크기 설정 */

  /* 마우스를 올렸을 때 투명도를 줄여 색상이 약간 밝아지는 효과 */
  &:hover {
    opacity: 0.9;
  }
`;

export const DeleteButton = styled.button`
  /* 버튼의 배경을 그라디언트로 설정 */
  background: linear-gradient(135deg, #dc3545, #c82333); 
  padding: 8px 16px; /* 내부 여백 설정 */
  border: none; /* 테두리 제거 */
  border-radius: 4px; /* 둥근 모서리 적용 */

  /* 배경 색상 (중복된 설정, 불필요한 부분) */
  background: linear-gradient(135deg, #007bff, #0056b3); 

  color: #fff; /* 글자 색상을 흰색으로 설정 */
  cursor: pointer; /* 마우스를 올리면 포인터 모양으로 변경 */
  font-size: 1rem; /* 글자 크기 설정 */

  /* 마우스를 올렸을 때 투명도를 줄여서 색상이 약간 밝아지도록 설정 */
  &:hover {
    opacity: 0.9;
  }
`;

export const EditButton = styled.button`
  padding: 8px 16px; /* 내부 여백 설정 */
  background: linear-gradient(135deg, #17a2b8, #117a8b); /* 청록색 계열 그라디언트 배경 */
  border: none; /* 테두리 제거 */
  border-radius: 4px; /* 모서리를 둥글게 만듦 */
  color: #fff; /* 글자 색상을 흰색으로 설정 */
  cursor: pointer; /* 마우스를 올리면 포인터 모양으로 변경 */
  font-size: 1rem; /* 글자 크기 설정 */

  /* 마우스를 올렸을 때 투명도를 줄여 색상이 약간 밝아지는 효과 */
  &:hover {
    opacity: 0.9;
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