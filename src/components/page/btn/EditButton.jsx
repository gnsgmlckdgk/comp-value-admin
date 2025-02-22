import React from 'react';
import { EditButton as StyledEditButton } from './btnStyles/styles01';

/**
 * EditButton 컴포넌트
 *
 * 이 컴포넌트는 수정 버튼을 렌더링하는 역할을 합니다.
 * 버튼의 스타일은 `styled-components`를 사용하여 정의되며,
 * 클릭 이벤트 핸들러를 통해 외부에서 수정 기능을 제어할 수 있습니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성 객체
 * @param {string} props.btnNm - 버튼에 표시될 텍스트
 * @param {function} [props.onClick] - 버튼 클릭 시 실행될 함수 (선택적)
 * @returns {JSX.Element} - 수정 버튼 컴포넌트
 */
const EditButton = ({ btnNm, onClick }) => {
  return (
    // onClick이 존재하면 해당 핸들러를 추가하여 버튼 클릭 이벤트 처리
    <StyledEditButton {...(onClick ? { onClick } : {})}>
      {btnNm} {/* 버튼에 표시될 텍스트 */}
    </StyledEditButton>
  );
}

export default EditButton; // 컴포넌트를 외부에서 사용할 수 있도록 export