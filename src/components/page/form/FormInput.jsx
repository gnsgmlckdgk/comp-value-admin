import React from 'react';
import styled from 'styled-components';

/**
 * 📌 FormInput 컴포넌트
 *
 * 사용자가 텍스트 입력을 할 수 있는 입력 필드 (input)과 선택적으로 라벨을 표시할 수 있는 UI 요소.
 * `styled-components`를 사용하여 스타일을 적용하여 일관된 디자인을 유지합니다.
 */

/**
 * 🎨 FormInput 스타일 적용
 *
 * - 입력 필드와 라벨을 세로 정렬
 * - 기본적인 입력 필드의 스타일 지정 (여백, 테두리, 글자 크기 등)
 */
const FormInputSt = styled.div`
  display: flex;
  flex-direction: column; /* 입력 필드와 라벨을 세로 정렬 */

  label {
    margin-bottom: 8px; /* 라벨과 입력 필드 사이 여백 */
    font-weight: bold; /* 라벨의 글자 굵기 강조 */
  }

  input {
    padding: 8px; /* 내부 여백 설정 */
    border: 1px solid #ccc; /* 테두리 스타일 */
    border-radius: 4px; /* 둥근 모서리 적용 */
    font-size: 1rem; /* 입력 필드의 글자 크기 설정 */
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }
`

/**
 * 📝 FormInput 컴포넌트
 *
 * 이 컴포넌트는 입력 필드를 렌더링하며, 라벨을 표시할 수도 있습니다.
 * 
 * @param {Object} props - 컴포넌트에 전달되는 속성 객체
 * @param {string} props.label - 입력 필드에 대한 라벨 텍스트 (선택적)
 * @param {string} props.value - 입력 필드의 값 (상태와 연동)
 * @param {function} props.onChange - 입력 값이 변경될 때 호출되는 함수
 * @param {string} [props.type="text"] - 입력 필드의 타입 (기본값: "text")
 * @param {string} [props.placeholder=""] - 입력 필드의 플레이스홀더 (기본값: 빈 문자열)
 * @returns {JSX.Element} - 입력 필드 및 라벨을 포함하는 JSX 요소
 */
const FormInput = ({ label, value, onChange, type = "text", placeholder = "" }) => {
  return (
    <FormGroup>
      <FormInputSt>
        {/* 라벨이 존재하는 경우에만 렌더링 */}
        {label && <label>{label}</label>}

        {/* 입력 필드 */}
        <input
          aria-label={label || placeholder} // 접근성을 위한 label 제공
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </FormInputSt>
    </FormGroup>
  );
};

export default FormInput; // 컴포넌트를 외부에서 사용할 수 있도록 export