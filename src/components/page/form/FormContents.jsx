import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill-new'; // WYSIWYG 에디터 라이브러리

/**
 * 스타일이 적용된 ReactQuill 컴포넌트
 *
 * ReactQuill은 리치 텍스트 에디터(WYSIWYG)로,
 * 사용자가 텍스트를 입력하고 서식을 적용할 수 있도록 함.
 * `styled-components`를 사용하여 기본 스타일을 커스텀함.
 */
const StyledReactQuill = styled(ReactQuill)`
  .ql-container {
    border: 1px solid #ddd; /* 에디터 테두리 스타일 */
    border-radius: 4px; /* 테두리를 둥글게 만듦 */
  }

  .ql-editor {
    font-size: 1.1rem; /* 텍스트 크기 설정 */
    min-height: 300px; /* 에디터의 최소 높이 설정 */
    min-height: ${(props) => props.minHeight}px;
  }

  .ql-toolbar {
    background-color: #f8f9fa; /* 툴바 배경색 설정 */
  }
`;

/**
 * 폼 그룹 스타일을 적용한 컨테이너
 *
 * 입력 필드와 라벨을 포함하는 폼 그룹을 정의하며,
 * 기본적인 스타일을 적용하여 가독성을 높임.
 */
const FormGroup = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */

  label {
    margin-bottom: 8px; /* 라벨과 입력 필드 사이 여백 */
    font-weight: bold; /* 글씨 굵기 강조 */
  }

  input {
    padding: 8px; /* 내부 여백 설정 */
    border: 1px solid #ccc; /* 테두리 스타일 */
    border-radius: 4px; /* 둥근 모서리 적용 */
    font-size: 1rem; /* 입력 필드의 글자 크기 설정 */
  }
`;

/**
 * FormContents 컴포넌트
 *
 * 이 컴포넌트는 라벨과 WYSIWYG 에디터(ReactQuill)를 포함하는 폼 요소를 렌더링합니다.
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성 객체
 * @param {string} [props.label=''] - 입력 필드의 라벨 텍스트 (기본값: 빈 문자열)
 * @param {boolean} [props.labelFlag=false] - 라벨을 표시할지 여부 (기본값: false)
 * @param {string} props.content - 에디터의 현재 값
 * @param {function} props.setContent - 에디터 값이 변경될 때 호출되는 함수
 * @returns {JSX.Element} - 폼 컨텐츠 컴포넌트
 */
const FormContents = ({ label = '', labelFlag = false, content, setContent, minHeight = '300px' }) => {
  return (
    <FormGroup>
      {/* labelFlag가 true일 때만 라벨을 표시 */}
      {labelFlag && <label>{label}</label>}

      {/* ReactQuill 에디터: 입력된 내용(content)을 표시하고, 변경될 때 setContent로 업데이트 */}
      <StyledReactQuill theme="snow" value={content} onChange={setContent} />
    </FormGroup>
  );
}

export default FormContents; // 외부에서 사용할 수 있도록 export