import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { send } from '../../../components/util/clientUtil';
import {
    BoardContainer,
    Title,
    SearchButton,
    ResetButton,
    PaginationContainer,
    PaginationButton,
    WarningMessage,
    ConfirmModalOverlay,
    ConfirmModalContainer,
    ConfirmModalTitle,
    ConfirmModalButtonContainer,
    ConfirmButton,
    CancelButton
} from '../styles/styles';
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

import LoadingOverlayComp from '../../components/common/ui/LoadingOverlay';

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

// 추가: ActionButton 스타일 컴포넌트
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

// 삭제 버튼용 DeleteButton
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

// 샘플 데이터 생성 함수 (필요시 사용)
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
// ---------------------------------

//@ 그리드 페이징 설정
const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 20, 50, 100];

const BoardListPage = () => {

    const location = useLocation();

    // 전달된 state가 있다면 초기값으로 사용, 없다면 기본값 사용
    // ex) currentPage 값이 있으면 그 값으로 initialCurPage 설정, 없으면 기본값 설정
    const {
        currentPage: initialCurPage = 1,
        sgubun: initialSgubun = "0",
        searchText: initialSearchText = ""
    } = location.state || {};

    const pageSize = 30;
    const [rowData, setRowData] = useState([]);
    const [searchText, setSearchText] = useState(initialSearchText);
    // sgubun 상태 추가 (검색종류: "0" 전체, "1" 제목, "2" 작성자, "3" 내용 등)
    const [sgubun, setSgubun] = useState(initialSgubun);
    const [currentPage, setCurrentPage] = useState(initialCurPage);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const gridRef = useRef();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // loadData 함수: search와 sgubun 값을 인자로 받아 사용
    const loadData = async (page = 0, pageSize = 30, search = "", sgubun = "0") => {
        const sendUrl = window.location.hostname === "localhost"
            ? `http://localhost:18080/dart/freeboard?page=${page}&size=${pageSize}&search=${search}&sgubun=${sgubun}`
            : `/dart/freeboard?page=${page}&size=${pageSize}&search=${search}&sgubun=${sgubun}`;

        setIsLoading(true);
        const { data, error } = await send(sendUrl, {});
        setIsLoading(false);

        if (data && data.length > 0) {
            return data;
        } else {
            return [];
        }
    };

    // 컴포넌트 마운트 시 첫 페이지 데이터 로드
    useEffect(() => {
        const fetchData = async () => {
            const data = await loadData(0, pageSize, searchText, sgubun);
            setRowData(data);
            setTotalPages(Math.ceil(data.length / pageSize));
        };
        fetchData();
        // }, [pageSize, searchText, sgubun]);
    }, [pageSize]);

    const rowSelection = useMemo(() => ({ mode: 'multiRow' }), []);

    // 페이지 변경 함수
    const fetchPage = async (page) => {
        const pageData = await loadData(page, pageSize, searchText, sgubun);
        setRowData(pageData);
        setCurrentPage(page);
    };

    const [columnDefs] = useState([
        { headerName: "ID", field: "id", sortable: true, filter: true, flex: 1 },
        { headerName: "제목", field: "title", sortable: true, filter: true, flex: 5, cellRenderer: ReportNameRenderer },
        { headerName: "작성자", field: "author", sortable: true, filter: true, flex: 2 },
        { headerName: "날짜", field: "date", sortable: true, filter: true, flex: 3 }
    ]);

    // 셀 클릭: 제목 셀 클릭 시 뷰 페이지 이동
    const onCellClicked = (params) => {
        if (params.colDef.field === "title" && params.data) {
            navigate(`/freeBoard/view/${params.data.id}`, {
                state: {
                    currentPage: currentPage,
                    sgubun: sgubun,
                    searchText: searchText
                }
            });
        }
    };

    // 검색 함수: searchText와 sgubun 값을 loadData에 전달
    const handleSearch = async () => {
        const data = await loadData(0, pageSize, searchText, sgubun);
        setRowData(data.slice(0, pageSize));
        setCurrentPage(1);
        setTotalPages(Math.ceil(data.length / pageSize));
    };

    // 초기화 함수: 검색어와 sgubun 리셋
    const handleReset = () => {
        setSearchText('');
        setSgubun('0');
        setRowData(rowData.slice(0, pageSize));
        setCurrentPage(1);
        setTotalPages(Math.ceil(rowData.length / pageSize));
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
        setRowData(remainingData.slice(0, pageSize));
        setTotalPages(Math.ceil(remainingData.length / pageSize));
        setCurrentPage(1);
        setShowConfirm(false);
    };

    // 삭제 취소
    const cancelDelete = () => {
        setShowConfirm(false);
    };

    if (isLoading) {
        return <LoadingOverlayComp isLoadingFlag={isLoading} />;
    }

    return (
        <BoardContainer>
            <Title>자유게시판</Title>
            <div style={{ marginBottom: '16px' }}>
                {/* 상단 검색 및 옵션 영역 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <select
                        value={sgubun}
                        onChange={(e) => setSgubun(e.target.value)}
                        style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                    >
                        <option value="0">전체</option>
                        <option value="1">제목</option>
                        <option value="2">작성자</option>
                        <option value="3">내용</option>
                        <option value="4">제목, 내용</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            flexGrow: 1
                        }}
                    />
                    <SearchButton onClick={handleSearch}>검색</SearchButton>
                    <ResetButton onClick={handleReset}>초기화</ResetButton>
                </div>
                {/* 버튼 영역 (게시글 등록, 선택 삭제) */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                    <ActionButton onClick={() => navigate('/freeBoard/view')}>
                        게시글 등록
                    </ActionButton>
                    <DeleteButton onClick={handleDeleteButtonClick}>
                        선택 삭제
                    </DeleteButton>
                </div>
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
                    pagination={pagination}
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
