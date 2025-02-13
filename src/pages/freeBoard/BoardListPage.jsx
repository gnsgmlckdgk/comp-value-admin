import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { send } from '../../components/util/clientUtil';
import { BoardContainer, Title, ActionButton, WarningMessage, DeleteButton } from '../../components/common/board/styles/styles';
import SearchBar from '../../components/common/board/SearchBar';
import BoardGrid from '../../components/common/board/BoardGrid';
import PaginationControls from '../../components/common/board/PaginationControls';
import ConfirmModal from '../../components/common/board/ConfirmModal';
import LoadingOverlayComp from '../../components/common/ui/LoadingOverlay';
import { ModuleRegistry, RowSelectionModule, ClientSideRowModelModule, ValidationModule, PaginationModule, TextFilterModule, NumberFilterModule, DateFilterModule } from 'ag-grid-community';
import { motion } from 'framer-motion';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([
    RowSelectionModule,
    ClientSideRowModelModule,
    ValidationModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule
]);

//@ 그리드 페이징 설정
const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 20, 50, 100];

const BoardListPage = () => {
    const location = useLocation();
    const {
        currentPage: initialCurPage = 1,
        sgubun: initialSgubun = "0",
        searchText: initialSearchText = ""
    } = location.state || {};

    const pageSize = 30;
    const [rowData, setRowData] = useState([]);
    const [searchText, setSearchText] = useState(initialSearchText);
    const [sgubun, setSgubun] = useState(initialSgubun);
    const [currentPage, setCurrentPage] = useState(initialCurPage);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const gridRef = useRef();
    const navigate = useNavigate();

    // loadData 함수
    const loadData = async (page = 0, pageSize = 30, search = "", sgubun = "0") => {
        const sendUrl = window.location.hostname === "localhost"
            ? `http://localhost:18080/dart/freeboard?page=${page}&size=${pageSize}&search=${search}&sgubun=${sgubun}`
            : `/dart/freeboard?page=${page}&size=${pageSize}&search=${search}&sgubun=${sgubun}`;

        setIsLoading(true);
        const { data, error } = await send(sendUrl, {});
        setIsLoading(false);

        return data && data.length > 0 ? data : [];
    };

    // 데이터 로드: 컴포넌트 마운트 시
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
        { headerName: "제목", field: "title", sortable: true, filter: true, flex: 5 },
        { headerName: "작성자", field: "author", sortable: true, filter: true, flex: 2 },
        { headerName: "날짜", field: "date", sortable: true, filter: true, flex: 3 }
    ]);

    // 검색, 초기화, 삭제 등 이벤트 핸들러
    const handleSearch = async () => {
        const data = await loadData(0, pageSize, searchText, sgubun);
        setRowData(data.slice(0, pageSize));
        setCurrentPage(1);
        setTotalPages(Math.ceil(data.length / pageSize));
    };

    const handleReset = () => {
        setSearchText('');
        setSgubun('0');
        setRowData(rowData.slice(0, pageSize));
        setCurrentPage(1);
        setTotalPages(Math.ceil(rowData.length / pageSize));
        setErrorMsg('');
    };

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

    const confirmDelete = () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const remainingData = rowData.filter(item => !selectedData.some(selected => selected.id === item.id));
        setRowData(remainingData.slice(0, pageSize));
        setTotalPages(Math.ceil(remainingData.length / pageSize));
        setCurrentPage(1);
        setShowConfirm(false);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

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

    if (isLoading) {
        return <LoadingOverlayComp isLoadingFlag={isLoading} />;
    }

    return (
        <BoardContainer>
            <Title>자유게시판</Title>
            <SearchBar
                sgubun={sgubun}
                searchText={searchText}
                onSgubunChange={(e) => setSgubun(e.target.value)}
                onSearchTextChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
                onReset={handleReset}
            />
            {/* 버튼 영역 (게시글 등록, 선택 삭제) */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', marginBottom: '8px' }}>
                <ActionButton onClick={() => navigate('/freeBoard/view')}>
                    게시글 등록
                </ActionButton>
                <DeleteButton onClick={handleDeleteButtonClick}>
                    선택 삭제
                </DeleteButton>
            </div>
            {errorMsg && <WarningMessage>{errorMsg}</WarningMessage>}
            <BoardGrid
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection={rowSelection}
                onPaginationChanged={() => {
                    if (gridRef.current && gridRef.current.api) {
                        const currentPageBuiltin = gridRef.current.api.paginationGetCurrentPage() + 1;
                        // 내장 페이징과 커스텀 페이징 동기화 (원하는 경우)
                        // setCurrentPage(currentPageBuiltin);
                    }
                }}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                onCellClicked={onCellClicked}
            />
            {/* 커스텀 페이징 컨트롤 */}
            <PaginationControls
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={fetchPage}
            />
            {showConfirm && (
                <ConfirmModal
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    title={'삭제 확인'}
                    message={'선택된 게시물을 삭제하시겠습니까?'}
                    yesText={'확인'}
                    noText={'취소'}
                />
            )}
        </BoardContainer>
    );
};

export default BoardListPage;
