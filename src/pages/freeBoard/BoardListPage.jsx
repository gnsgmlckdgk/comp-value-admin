// 라이브러리
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 유틸
import { send } from '@utils/clientUtil';

// 컴포넌트
import SearchBar from '@components/board/SearchBar';
import BoardGrid from '@components/board/BoardGrid';
import PaginationControls from '@components/board/PaginationControls';
import ConfirmModal from '@components/board/ConfirmModal';
import ButtonColBox from '@components/btn/ButtonColBox';
import LoadingOverlayComp from '@components/ui/LoadingOverlay';
import BoardContainer from '@components/board/BoardContainer';
import ActionButton from '@components/btn/ActionButton';
import DeleteButton from '@components/btn/DeleteButton';
import WarningMessage from '@components/message/WarningMessage';

// AG-Grid
import {
    ModuleRegistry,
    RowSelectionModule,
    ClientSideRowModelModule,
    ValidationModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
ModuleRegistry.registerModules([
    RowSelectionModule,
    ClientSideRowModelModule,
    ValidationModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
]);



// 그리드 페이징 설정
const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 20, 50, 100];

const BoardListPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        currentPage: initialCurPage = 1,
        sgubun: initialSgubun = '1',
        searchText: initialSearchText = '',
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

    // 데이터 로드 함수
    const loadData = useCallback(
        async (page = 0, pageSize = 30, search = '', sgubun = '0') => {
            const sendUrl =
                window.location.hostname === 'localhost'
                    ? `http://localhost:18080/dart/freeboard?page=${page}&size=${pageSize}&search=${search}&sgubun=${sgubun}`
                    : `/dart/freeboard?page=${page}&size=${pageSize}&search=${search}&sgubun=${sgubun}`;

            setIsLoading(true);
            const { data } = await send(sendUrl, {});
            setIsLoading(false);

            if (data.data && data.data.length > 0) {
                return {
                    data: data.data,
                    total: data.total || data.data.length,
                };
            } else {
                return { data: [], total: 0 };
            }

        },
        []
    );

    const fetchData = async (selPage) => {
        const response = await loadData(selPage ? selPage : 0, pageSize, searchText, sgubun);
        setRowData(response.data);
        setTotalPages(Math.ceil(response.total / pageSize));
    };

    // 컴포넌트 마운트 시 데이터 로드 (원래 [pageSize]만 의존)
    useEffect(() => {
        // const fetchData = async () => {
        //     const response = await loadData(0, pageSize, searchText, sgubun);
        //     setRowData(response.data);
        //     setTotalPages(Math.ceil(response.total / pageSize));
        // };
        fetchData();
    }, [pageSize, loadData]); // 원래는 [pageSize]만 사용했음

    const rowSelection = useMemo(() => ({ mode: 'multiRow' }), []);

    // 페이지 변경 핸들러
    const fetchPage = useCallback(
        async (page) => {
            const response = await loadData(page - 1, pageSize, searchText, sgubun);
            setRowData(response.data);
            setCurrentPage(page);
        },
        [loadData, pageSize, searchText, sgubun]
    );

    // 컬럼 정의 (상수이므로 useMemo 사용)
    const columnDefs = useMemo(
        () => [
            { headerName: 'ID', field: 'id', sortable: true, filter: true, flex: 1 },
            { headerName: '제목', field: 'title', sortable: true, filter: true, flex: 5 },
            { headerName: '작성자', field: 'author', sortable: true, filter: true, flex: 2 },
            { headerName: '날짜', field: 'date', sortable: true, filter: true, flex: 3 },
        ],
        []
    );

    // 검색 핸들러
    const handleSearch = useCallback(async () => {
        const response = await loadData(0, pageSize, searchText, sgubun);
        setRowData(response.data.slice(0, pageSize));
        setCurrentPage(1);
        setTotalPages(Math.ceil(response.total / pageSize));
    }, [loadData, pageSize, searchText, sgubun]);

    // 초기화 핸들러
    const handleReset = useCallback(() => {
        setSearchText('');
        setSgubun('0');
        setRowData(rowData.slice(0, pageSize));
        setCurrentPage(1);
        setTotalPages(Math.ceil(rowData.length / pageSize));
        setErrorMsg('');
    }, [rowData, pageSize]);

    // 삭제 버튼 클릭 핸들러
    const handleDeleteButtonClick = useCallback(() => {

        if (!gridRef.current || !gridRef.current.api) return;
        const selectedNodes = gridRef.current.api.getSelectedNodes();

        if (selectedNodes.length === 0) {
            setErrorMsg('삭제할 게시물이 선택되지 않았습니다.');
        } else {
            setErrorMsg('');
            setShowConfirm(true);
        }
    }, []);

    // 삭제 확인 핸들러
    const confirmDelete = useCallback(async () => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        await deleteProc(selectedNodes);
        fetchData(currentPage - 1);

        setShowConfirm(false);
    }, [rowData, pageSize]);

    const cancelDelete = useCallback(() => {
        setShowConfirm(false);
    }, []);


    const deleteProc = async (selectedNodes) => {
        setIsLoading(true);
        // 병렬처리
        await Promise.all(
            selectedNodes.map(element => {
                const id = element.data.id;
                const sendUrl =
                    window.location.hostname === 'localhost'
                        ? `http://localhost:18080/dart/freeboard/delete/${id}`
                        : `/dart/freeboard/delete/${id}`;
                return send(sendUrl, {}, 'DELETE');
            })
        );
        alert("삭제되었습니다.");
        setIsLoading(false);
    }


    // 셀 클릭 핸들러 (제목 클릭 시 상세보기 페이지로 이동)
    const onCellClicked = useCallback(
        (params) => {
            if (params.colDef.field === 'title' && params.data) {
                navigate(`/freeBoard/view/${params.data.id}`, {
                    state: {
                        currentPage,
                        sgubun,
                        searchText,
                    },
                });
            }
        },
        [navigate, currentPage, sgubun, searchText]
    );


    // 테스트: 게시글 20건 한 번에 등록하는 함수
    const handleBulkRegister = useCallback(async () => {
        const registerUrl =
            window.location.hostname === 'localhost'
                ? `http://localhost:18080/dart/freeboard/regi`
                : `/dart/freeboard/regi`;
        setIsLoading(true);
        try {
            for (let i = 1; i <= 20; i++) {
                await send(
                    registerUrl,
                    {
                        title: `Test Post ${i}`,
                        author: 'Tester',
                        content: `This is the content for test post number ${i}`,
                    },
                    'POST'
                );
            }
            // 등록 후 데이터를 다시 불러오기
            const response = await loadData(0, pageSize, searchText, sgubun);
            setRowData(response.data);
            setTotalPages(Math.ceil(response.total / pageSize));
            setCurrentPage(1);
        } catch (error) {
            console.error('Bulk registration error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [loadData, pageSize, searchText, sgubun]);


    if (isLoading) {
        return <LoadingOverlayComp isLoadingFlag={isLoading} />;
    }

    return (
        <BoardContainer title='자유게시판' titleFlag={true}>
            <SearchBar
                sgubun={sgubun}
                searchText={searchText}
                onSgubunChange={(e) => setSgubun(e.target.value)}
                onSearchTextChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <ButtonColBox gap='3px' marginTop='8px' marginBottom='8px'>
                <ActionButton btnNm='등록' type='text' onClick={() => navigate('/freeBoard/view')} />
                <DeleteButton btnNm='선택삭제' onClick={handleDeleteButtonClick} />
                <ActionButton btnNm='테스트등록(20건)' type='text' onClick={handleBulkRegister} />
            </ButtonColBox>
            {errorMsg && <WarningMessage message={errorMsg} />}



            <BoardGrid
                ref={gridRef}
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
            <PaginationControls totalPages={totalPages} currentPage={currentPage} onPageChange={fetchPage} />
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