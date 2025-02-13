// File: components/BoardListPage/PaginationControls.jsx
import React from 'react';
import { PaginationContainer, PaginationButton } from './styles/styles';

const PaginationControls = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <PaginationContainer>
            {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                    <PaginationButton
                        key={pageNum}
                        $active={pageNum === currentPage}
                        onClick={() => onPageChange(pageNum)}
                    >
                        {pageNum}
                    </PaginationButton>
                );
            })}
        </PaginationContainer>
    );
};

export default PaginationControls;
