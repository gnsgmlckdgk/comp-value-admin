import styled from 'styled-components';

/* 
  전체 감싸는 컨테이너:
  - 화이트 카드 느낌, 그림자 살짝
  - 사이트 배경이 어두운 편이라면 이 영역은 밝게 두고,
    내부 요소를 더 강조
*/
const Container = styled.div`
  max-width: 640px;
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

/* 검색 폼 영역 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  padding: 0;
`;

/* 텍스트 인풋 */
const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #999;
  }
`;

/* 버튼: 헤더 그라디언트와 어울리는 스타일 */
const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  background: linear-gradient(135deg, #252850, #181a31);

  &:hover {
    opacity: 0.9;
  }
`;

/* 헤더 텍스트 (H1) */
const H1 = styled.h1`
  font-weight: bolder;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 24px;
  color: #181a31;
`;

/* 결과 메시지를 감싸는 영역 */
const ResultMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

/* 결과 각각의 항목 */
const resultMessageLi = styled.div`
  margin-top: 8px;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  display: flex;
  flex-direction: column;        // 수직으로 쌓기
  align-items: flex-start;       // 왼쪽 정렬

  color: #4a4a4a;

  & + & {
    margin-top: 12px; /* 항목 간 간격 */
  }
`;

/* 항목명 */
const resultSpan = styled.span`
  display: inline-block;
  min-width: 120px;
  color: #6b7280;
  font-weight: 500;
`;

/* 값 */
const resultSpan2 = styled.span`
  display: inline-block;
  min-width: 80px;
  font-weight: 700;
  color: #181a31;
`;

/* 강조 텍스트 (기본) */
const StrongText = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    font-size: 1.4rem;
    opacity: 0.8;
  }
`;

/* 강조 텍스트 (빨간색) */
const StrongTextRed = styled(StrongText)`
  color: red;

  &:hover {
    color: rgb(255, 80, 80);
    font-size: 1.4rem;
    opacity: 0.8;
  }
`;

export {
  Container,
  Form,
  Input,
  Button,
  H1,
  ResultMessage,
  resultMessageLi,
  resultSpan,
  resultSpan2,
  StrongText,
  StrongTextRed
};
