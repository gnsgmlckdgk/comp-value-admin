import React from 'react';
import { ActionButton as StyledActionButton } from './btnStyles/styles01';

/**
 * ActionButton 컴포넌트
 *
 * 이 컴포넌트는 사용자가 클릭할 수 있는 액션 버튼을 렌더링합니다.
 * 버튼의 스타일은 `styled-components`를 사용하여 적용되며, 기본적으로 `submit` 타입의 버튼입니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성 객체
 * @param {string} props.btnNm - 버튼에 표시될 텍스트
 * @param {string} props.type - 버튼 타입(submit, text)
 * @returns {JSX.Element} - 액션 버튼 컴포넌트
 */
const ActionButton = ({ btnNm, type = 'submit', onClick }) => {
  return (
    // 버튼의 타입을 `submit`으로 설정하여 폼 제출에 사용할 수 있도록 함
    <StyledActionButton type={type} onClick={onClick} >{btnNm}</StyledActionButton>
  );
}

export default ActionButton; // 컴포넌트를 외부에서 사용할 수 있도록 export