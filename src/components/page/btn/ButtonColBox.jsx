import React from 'react';

/**
 * ButtonColBox 컴포넌트
 * 
 * 이 컴포넌트는 flex 컨테이너 역할을 하며, 내부의 자식 요소들을 flex 스타일로 배치합니다.
 * 버튼이나 기타 UI 요소들을 정렬하는 데 유용하게 사용할 수 있습니다.
 * 
 * @param {Object} props - 컴포넌트에 전달되는 props 객체
 * @param {React.ReactNode} props.children - 컨테이너 내부에 렌더링될 자식 요소들
 * @param {string} [props.flexWrap='wrap'] - flex 컨테이너의 flex-wrap 속성 값. 기본값은 'wrap'
 * @param {string} [props.sort='left'] - 자식 요소 정렬 옵션. 'right'을 전달하면 오른쪽 정렬, 기본값은 'left'
 * @param {string} [props.gap] - 자식 요소들 사이의 간격 (CSS gap 속성)
 * @param {string} [props.marginTop='0px'] - 상단 마진 값, 기본값은 '0px'
 * @param {string} [props.marginRight='0px'] - 우측 마진 값, 기본값은 '0px'
 * @param {string} [props.marginBottom='0px'] - 하단 마진 값, 기본값은 '0px'
 * @param {string} [props.marginLeft='0px'] - 좌측 마진 값, 기본값은 '0px' (현재 스타일 객체에는 사용되지 않음)
 * @returns {JSX.Element} ButtonColBox 컴포넌트
 */
const ButtonColBox = ({
    children,
    flexWrap = 'wrap',
    sort = 'left',
    gap,
    marginTop = '0px',
    marginRight = '0px',
    marginBottom = '0px',
    marginLeft = '0px' // 현재 적용되지 않는 스타일 값 (필요 시 추가해야 함)
}) => {
    return (
        <div
            style={{
                display: 'flex', // flex 컨테이너로 설정
                ...(sort === 'right' && { justifyContent: 'flex-end' }), // 정렬 옵션이 'right'이면 오른쪽 정렬
                ...(flexWrap !== '' && { flexWrap }), // flexWrap 값이 전달되었을 경우 적용
                gap, // 요소 간 간격 적용 (undefined면 적용되지 않음)
                marginTop, // 상단 마진 적용
                marginRight, // 우측 마진 적용
                marginBottom // 하단 마진 적용
                // marginLeft는 현재 사용되지 않음
            }}
        >
            {children} {/* 자식 요소들을 렌더링 */}
        </div>
    );
};

export default ButtonColBox; // 컴포넌트 내보내기 (다른 파일에서 import 가능)