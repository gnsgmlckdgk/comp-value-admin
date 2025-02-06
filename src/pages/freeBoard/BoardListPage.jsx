// File: components/BoardListPage.jsx
import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardContainer, Title, SearchButton, ResetButton, ButtonContainer } from './styles/styles';
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
import styled, { createGlobalStyle } from 'styled-components';

// 모듈 등록
ModuleRegistry.registerModules([
    RowSelectionModule,
    ClientSideRowModelModule,
    ValidationModule, // Development Only
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

// 삭제 버튼용 DeleteButton 추가 (빨간색 계열)
const DeleteButton = styled(ActionButton)`
  background: linear-gradient(135deg, #dc3545, #c82333);
`;

// 추가: WarningMessage 스타일 (선택 없음 경고)
const WarningMessage = styled.div`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #ffe6e6;
  color: #d8000c;
  border: 1px solid #d8000c;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
`;

// 추가: 삭제 확인 모달 스타일
const ConfirmModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ConfirmModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const ConfirmModalTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 16px;
`;

const ConfirmModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #28a745, #218838);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #dc3545, #c82333);
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    opacity: 0.9;
  }
`;

// ReportNameRenderer: 제목 셀에 링크 커서 적용 및 클릭 시 뷰 페이지 이동
const ReportNameRenderer = (params) => {
    return (
        <div style={{ cursor: 'pointer' }}>
            {params.value}
        </div>
    );
};

// 백엔드 데이터 대신 사용할 샘플 데이터 생성 함수
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
const initialData = createSampleData(100);

function BoardListPage() {
    const [rowData, setRowData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [pageSize, setPageSize] = useState(20);
    const [errorMsg, setErrorMsg] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const gridRef = useRef();
    const navigate = useNavigate();

    // AG-Grid 컬럼 정의 (삭제 관련 체크박스는 제거하고 기본 컬럼만 사용)
    const [columnDefs] = useState([
        { headerName: "ID", field: "id", sortable: true, filter: true, flex: 1 },
        { headerName: "제목", field: "title", sortable: true, filter: true, flex: 5, cellRenderer: ReportNameRenderer },
        { headerName: "작성자", field: "author", sortable: true, filter: true, flex: 2 },
        { headerName: "날짜", field: "date", sortable: true, filter: true, flex: 3 }
    ]);

    // 셀 클릭 시, 제목 셀이면 해당 행의 뷰 페이지로 이동
    const onCellClicked = (params) => {
        if (params.colDef.field === "title" && params.data) {
            navigate(`/view/${params.data.id}`);
        }
    };

    // 검색 버튼 클릭 시 데이터 필터링
    const handleSearch = () => {
        if (searchText === '') {
            setRowData(initialData);
        } else {
            const filteredData = initialData.filter(item =>
                item.title.includes(searchText) ||
                item.author.includes(searchText)
            );
            setRowData(filteredData);
        }
    };

    // 초기화 버튼 클릭 시 검색어 및 데이터 리셋
    const handleReset = () => {
        setSearchText('');
        setRowData(initialData);
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
        const remainingData = rowData.filter(item => !selectedData.some(selected => selected.id === item.id));
        setRowData(remainingData);
        setShowConfirm(false);
    };

    // 삭제 취소
    const cancelDelete = () => {
        setShowConfirm(false);
    };

    // 페이지 변경 시 처리 (백엔드 전송 샘플)
    const onPageChanged = (newPage) => {
        // console.log("페이지 변경:", newPage);
        // TODO: 페이지 정보 백엔드 전송
    };

    //@ 페이징 설정
    // enables pagination in the grid
    const pagination = true;
    // sets 10 rows per page (default is 100)
    const paginationPageSize = 10;
    // allows the user to select the page size from a predefined list of page sizes
    const paginationPageSizeSelector = [10, 20, 50, 100];

    // 다중 선택을 위한 rowSelection
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
                    <ActionButton onClick={() => navigate('/register')}>게시글 등록</ActionButton>
                    <DeleteButton onClick={handleDeleteButtonClick}>선택 삭제</DeleteButton>
                </ButtonContainer>
                {errorMsg && <WarningMessage>{errorMsg}</WarningMessage>}
            </div>
            {/* AG-Grid 영역에 애니메이션 적용 */}
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
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    onPaginationChanged={() => {
                        if (gridRef.current && gridRef.current.api) {
                            const currentPage = gridRef.current.api.paginationGetCurrentPage() + 1;
                            onPageChanged(currentPage);
                        }
                    }}
                />
            </motion.div>
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
