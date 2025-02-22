import React from 'react';
import styled, { css } from 'styled-components';

/* 추가: Pagination 스타일 */
const PaginationContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: ${({ $active }) => ($active ? '#007bff' : '#ccc')};
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background: ${({ $active }) => ($active ? '#0056b3' : '#999')};
  }

  ${({ disabled }) =>
        disabled &&
        css`
      opacity: 0.2;
      cursor: not-allowed;
      &:hover {
        background-color: ${({ active }) => (active ? '#007BFF' : '#fff')};
      }
    `}

`;


function PaginationControls({ currentPage, totalPages, onPageChange }) {
    // 그룹 크기(한 화면에 표시할 최대 페이지 번호 수)
    const groupSize = 10;
    // 현재 페이지가 속한 그룹의 시작 번호와 끝 번호 계산
    const groupStart = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
    const groupEnd = Math.min(totalPages, groupStart + groupSize - 1);

    // 페이지 번호 목록 생성 (groupStart부터 groupEnd까지)
    const pageNumbers = [];
    for (let num = groupStart; num <= groupEnd; num++) {
        pageNumbers.push(num);
    }

    // 그룹 이동 가능 여부 (첫 그룹/마지막 그룹 여부)
    const isFirstGroup = groupStart === 1;
    const isLastGroup = groupEnd === totalPages;

    // 버튼 클릭 핸들러들
    const goToPage = (page) => {
        if (onPageChange) onPageChange(page);
    };
    const goToFirst = () => goToPage(1);
    const goToLast = () => goToPage(totalPages);
    const goToPrevGroup = () => {
        // 이전 그룹의 마지막 페이지로 이동
        const prevGroupLastPage = groupStart - 1;
        goToPage(prevGroupLastPage);
    };
    const goToNextGroup = () => {
        // 다음 그룹의 첫 페이지로 이동
        const nextGroupFirstPage = groupEnd + 1;
        goToPage(nextGroupFirstPage);
    };

    return (
        <PaginationContainer>

            {/* << 버튼: 첫 페이지로 이동 */}
            <PaginationButton onClick={goToFirst} disabled={currentPage === 1}>
                &laquo;
            </PaginationButton>

            {/* < 버튼: 이전 그룹으로 이동 */}
            <PaginationButton onClick={goToPrevGroup} disabled={isFirstGroup}>
                &lt;
            </PaginationButton>

            {/* 페이지 숫자 버튼들 */}
            {pageNumbers.map((num) => (
                <PaginationButton
                    key={num}
                    onClick={() => goToPage(num)}
                    $active={num === currentPage}  // 현재 페이지인 경우 강조 (예: active 스타일)
                >
                    {num}
                </PaginationButton>
            ))}

            {/* > 버튼: 다음 그룹으로 이동 */}
            <PaginationButton onClick={goToNextGroup} disabled={isLastGroup}>
                &gt;
            </PaginationButton>

            {/* >> 버튼: 마지막 페이지로 이동 */}
            <PaginationButton onClick={goToLast} disabled={currentPage === totalPages}>
                &raquo;
            </PaginationButton>
        </PaginationContainer>
    );
}

export default PaginationControls;
