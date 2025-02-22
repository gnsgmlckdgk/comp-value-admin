import React from 'react';
import styled from 'styled-components';

/**
 * 📌 FormWrapper 컴포넌트
 *
 * 이 컴포넌트는 입력 폼을 감싸는 컨테이너 역할을 합니다.
 * 내부에 포함된 입력 필드들을 세로 정렬하고, 폼 제출 기능을 제공합니다.
 */

/**
 * 🎨 스타일이 적용된 FormWrapper 컨테이너
 *
 * - `display: flex`를 사용하여 내부 요소들을 정렬함
 * - `flex-direction: column`을 적용하여 입력 필드를 세로 배치
 * - `gap: 16px`을 설정하여 입력 요소 간의 간격을 조정
 */
const FormWrapperSt = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px; /* 입력 필드 간격 */
`;

/**
 * 📝 FormWrapper 컴포넌트
 *
 * 이 컴포넌트는 `<form>` 요소를 감싸는 역할을 하며, 
 * `handleSubmit`을 `onSubmit` 이벤트 핸들러로 전달하여 폼 제출을 처리합니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성 객체
 * @param {React.ReactNode} props.children - 내부에 렌더링될 폼 요소들 (입력 필드, 버튼 등)
 * @param {function} props.handleSubmit - 폼 제출 이벤트를 처리하는 함수
 * @returns {JSX.Element} - 폼 컨테이너 컴포넌트
 */
const FormWrapper = ({ children, handleSubmit }) => {
    return (
        <FormWrapperSt onSubmit={handleSubmit} autoComplete="off">
            {children} {/* 입력 필드 및 버튼 등을 렌더링 */}
        </FormWrapperSt>
    )
}

export default FormWrapper; // 외부에서 사용할 수 있도록 export