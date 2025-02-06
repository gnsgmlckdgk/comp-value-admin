// File: components/BoardListPage.jsx
import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BoardContainer,
    Title,
    SearchButton,
    ResetButton,
    ButtonContainer,
    FormWrapper,
    FieldsGrid,
    FormGroup,
    ErrorText,
    FullWidthFormGroup,
    SubFieldsGrid,
    SubFormGroup,
    ResultContainer,
    PaginationContainer,
    PaginationButton,
    WarningMessage,
    ConfirmModalOverlay,
    ConfirmModalContainer,
    ConfirmModalTitle,
    ConfirmModalButtonContainer,
    ConfirmButton,
    CancelButton
} from './styles/styles'; // 경로는 프로젝트 구조에 따라 조정하세요.
import { AgGridReact } from 'ag-grid-react';
import {
    ModuleRegistry,
    ClientSideRowModelModule,
    RowSelectionModule,
    ValidationModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule
} from 'ag-grid-community';
import { motion } from 'framer-motion';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';

// 모듈 등록
ModuleRegistry.registerModules([
    RowSelectionModule,
    ClientSideRowModelModule,
    ValidationModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule
]);

// 추가: ActionButton 스타일 컴포넌트 (버튼 디자인 개선)
const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

// 삭제 버튼용 DeleteButton (빨간색 계열)
const DeleteButton = styled(ActionButton)`
  background: linear-gradient(135deg, #dc3545, #c82333);
`;

// ReportNameRenderer: 제목 셀에 링크 커서 적용 및 클릭 시 뷰 페이지 이동
const ReportNameRenderer = (params) => {
    return (
        <div style={{ cursor: 'pointer' }}>
            {params.value}
        </div>
    );
};

// 샘플 데이터 생성 함수
const createSampleData = (cnt) =>
    Array.from({ length: cnt }, (_, index) => {
        const idx = index + 1;
        return {
            id: idx,
            title: `${idx}째 게시글`,
            author: '홍길동',
            date: '2025-01-01'
        };
    });
const totalData = createSampleData(100);

//@ 그리드 페이징 설정
// enables pagination in the grid
const pagination = true;
// sets 10 rows per page (default is 100)
const paginationPageSize = 10;
// allows the user to select the page size from a predefined list of page sizes
const paginationPageSizeSelector = [10, 20, 50, 100];

function BoardListPage() {

    const pageSize = 30;

    // 첫 페이지 데이터로 초기화
    const [rowData, setRowData] = useState(totalData.slice(0, pageSize));
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(totalData.length / pageSize));
    const [errorMsg, setErrorMsg] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const gridRef = useRef();
    const navigate = useNavigate();

    const [columnDefs] = useState([
        { headerName: "ID", field: "id", sortable: true, filter: true, flex: 1 },
        { headerName: "제목", field: "title", sortable: true, filter: true, flex: 5, cellRenderer: ReportNameRenderer },
        { headerName: "작성자", field: "author", sortable: true, filter: true, flex: 2 },
        { headerName: "날짜", field: "date", sortable: true, filter: true, flex: 3 }
    ]);

    // 셀 클릭: 제목 셀 클릭 시 해당 행의 뷰 페이지로 이동
    const onCellClicked = (params) => {
        if (params.colDef.field === "title" && params.data) {
            navigate(`/view/${params.data.id}`);
        }
    };

    // 검색: 전체 데이터에서 필터링 후 첫 페이지 데이터 설정
    const handleSearch = () => {
        const allData = totalData; // 실제 구현에서는 백엔드에서 검색 결과 받아오기
        if (searchText === '') {
            setRowData(allData.slice(0, pageSize));
            setCurrentPage(1);
            setTotalPages(Math.ceil(allData.length / pageSize));
        } else {
            const filteredData = allData.filter(item =>
                item.title.includes(searchText) || item.author.includes(searchText)
            );
            setRowData(filteredData.slice(0, pageSize));
            setCurrentPage(1);
            setTotalPages(Math.ceil(filteredData.length / pageSize));
        }
    };

    // 초기화: 검색어 및 데이터 리셋
    const handleReset = () => {
        setSearchText('');
        setRowData(totalData.slice(0, pageSize));
        setCurrentPage(1);
        setTotalPages(Math.ceil(totalData.length / pageSize));
        setErrorMsg('');
    };

    // 삭제 버튼 클릭 핸들러
    const handleDeleteButtonClick = () => {
        if (!gridRef.current || !gridRef.current.api) return;
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        if (selectedNodes.length === 0) {
            setErrorMsg('삭제할 게시물이 선택되지 않았습니다.');
        } else {
            setErrorMsg('');
            setShowConfirm(true);
        }
    };

    // 삭제 확인 후 삭제 수행
    const confirmDelete = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const remainingData = totalData.filter(item => !selectedData.some(selected => selected.id === item.id));
        setRowData(remainingData.slice(0, pageSize));
        setTotalPages(Math.ceil(remainingData.length / pageSize));
        setCurrentPage(1);
        setShowConfirm(false);
    };

    // 삭제 취소
    const cancelDelete = () => {
        setShowConfirm(false);
    };

    // 페이지 변경: 백엔드 호출 대신 전체 데이터에서 slice (실제 구현 시 API 호출)
    const fetchPage = (page) => {
        const start = (page - 1) * pageSize;
        const end = page * pageSize;
        const pageData = totalData.slice(start, end);
        // setRowData(pageData);
        // TODO: 백엔드 DB조회

        setCurrentPage(page);
    };

    // 내장 페이징은 AgGridReact에서 pagination={true}로 활성화됨
    const rowSelection = useMemo(() => {
        return {
            mode: 'multiRow'
        };
    }, []);

    return (
        <BoardContainer>
            <Title>게시판 목록</Title>
            <div style={{ marginBottom: '16px' }}>
                <input
                    type="text"
                    placeholder="검색어 입력"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginRight: '8px'
                    }}
                />
                <SearchButton onClick={handleSearch}>검색</SearchButton>
                <ResetButton onClick={handleReset}>초기화</ResetButton>
                <ButtonContainer style={{ marginTop: '8px' }}>
                    <ActionButton onClick={() => navigate('/register')}>
                        게시글 등록
                    </ActionButton>
                    <DeleteButton onClick={handleDeleteButtonClick}>
                        선택 삭제
                    </DeleteButton>
                </ButtonContainer>
                {errorMsg && <WarningMessage>{errorMsg}</WarningMessage>}
            </div>
            {/* AG-Grid 영역: 내장 페이징 활성화 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="ag-theme-alpine"
                style={{ height: '500px', width: '100%' }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{ flex: 1, resizable: true }}
                    rowSelection={rowSelection}
                    onCellClicked={onCellClicked}
                    pagination={pagination}  // 내장 페이징 활성화
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    onPaginationChanged={() => {
                        if (gridRef.current && gridRef.current.api) {
                            const currentPageBuiltin = gridRef.current.api.paginationGetCurrentPage() + 1;
                            // 내장 페이징과 커스텀 페이징 동기화 (원하는 경우)
                            // setCurrentPage(currentPageBuiltin);
                        }
                    }}
                />
            </motion.div>
            {/* 커스텀 페이징 컨트롤 */}
            <PaginationContainer>
                {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                        <PaginationButton
                            key={pageNum}
                            $active={pageNum === currentPage}
                            onClick={() => fetchPage(pageNum)}
                        >
                            {pageNum}
                        </PaginationButton>
                    );
                })}
            </PaginationContainer>
            {showConfirm && (
                <ConfirmModalOverlay>
                    <ConfirmModalContainer>
                        <ConfirmModalTitle>삭제 확인</ConfirmModalTitle>
                        <div>선택된 게시물을 삭제하시겠습니까?</div>
                        <ConfirmModalButtonContainer>
                            <ConfirmButton onClick={confirmDelete}>확인</ConfirmButton>
                            <CancelButton onClick={cancelDelete}>취소</CancelButton>
                        </ConfirmModalButtonContainer>
                    </ConfirmModalContainer>
                </ConfirmModalOverlay>
            )}
        </BoardContainer>
    );
}

export default BoardListPage;
