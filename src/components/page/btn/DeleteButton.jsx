import React from 'react';
import { DeleteButton as StyledDeleteButton } from './btnStyles/styles01';


/**
 * DeleteButton 컴포넌트
 *
 * 이 컴포넌트는 삭제 버튼을 렌더링하는 역할을 합니다.
 * 버튼의 스타일은 `styled-components`를 사용하여 정의되며,
 * 클릭 이벤트 핸들러를 통해 외부에서 삭제 기능을 제어할 수 있습니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성 객체
 * @param {string} props.btnNm - 버튼에 표시될 텍스트
 * @param {function} [props.onClick] - 버튼 클릭 시 실행될 함수 (선택적)
 * @returns {JSX.Element} - 삭제 버튼 컴포넌트
 */
const DeleteButton = ({ btnNm, onClick }) => {
  return (
    // onClick이 존재하면 해당 핸들러를 추가하여 버튼 클릭 이벤트 처리
    <StyledDeleteButton type="button" {...(onClick ? { onClick } : {})}>
      {btnNm} {/* 버튼 이름을 props로 받아서 출력 */}
    </StyledDeleteButton>
  );
}

export default DeleteButton; // 컴포넌트 내보내기 (다른 파일에서 import 가능)