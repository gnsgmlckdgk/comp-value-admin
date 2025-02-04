import styled from 'styled-components';

/* Container: 전체 레이아웃의 최대 너비 및 여백 설정 */
export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }
`;

/* H1: 제목 스타일 */
export const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

/* Form: 입력 폼 레이아웃, flex-wrap를 사용하여 반응형 배치 */
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;

/* Input: 입력 필드 스타일 */
export const Input = styled.input`
  padding: 10px;
  flex: 1;
  min-width: 200px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

/* Button: 버튼 스타일 */
export const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  outline: none;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

/* ResultMessage: 결과 메시지 목록 스타일 (ul 태그) */
export const ResultMessage = styled.ul`
  margin-top: 20px;
  padding: 0;
  list-style: none;
`;

/* resultMessageLi: 결과 메시지 항목
   - grid 레이아웃을 사용하여 라벨과 값을 각각 고정 너비와 나머지 영역으로 배분
   - 데스크탑에서는 150px, 1fr의 두 컬럼, 모바일에서는 단일 컬럼으로 표시 */
export const resultMessageLi = styled.li`
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

/* resultSpan: 항목 이름 (라벨) */
export const resultSpan = styled.span`
  font-weight: bold;
`;

/* resultSpan2: 항목 값 (값을 왼쪽 정렬로 표시) */
export const resultSpan2 = styled.span`
  text-align: left;
`;

/* StrongText: 강조 텍스트 */
export const StrongText = styled.span`
  font-weight: bold;
`;

/* StrongTextRed: 강조 텍스트(빨간색) */
export const StrongTextRed = styled(StrongText)`
  color: red;
`;
