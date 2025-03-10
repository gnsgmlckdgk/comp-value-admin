import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, ModuleRegistry, LocaleModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// 로딩 오버레이 (선택)
import LoadingOverlayComp from '@components/ui/LoadingOverlay';

// 서버 통신 함수 (가정)
import { send, asyncSend } from '@utils/clientUtil';

// 모듈 등록
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    LocaleModule
]);

import { API_CONFIG, GET_HOST } from '@config/apiConfig'


/* --- 스타일들 --- */
const BoardContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
    margin: 20px;
    padding: 15px;
  }
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 2rem;
  text-align: center;
  color: #181a31;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(135deg, #252850, #181a31);
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const GridWrapper = styled.div`
  width: 100%;
  height: 600px;

  @media (max-width: 768px) {
    height: 400px;
  }

  .ag-theme-alpine {
    font-family: inherit;
  }

`;

const DataCount = styled.div`
  display: block;
  text-align: right;
  font-size: 1em;

  @media (max-width: 600px) {
    text-align: left;
  }
`;


const ReportNameRenderer = (params) => {
    return (
        <div style={{ cursor: 'pointer' }}>
            {params.value}
        </div>
    );
};


/* --- Helper Functions --- */
/**
 * 오늘 날짜(yyyyMMdd) 반환
 * @returns {string}
 */
function getTodayYMD() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

/**
 * yyyyMMdd -> yyyy-MM-dd 형식으로 변환
 * @param {string} ymd 
 * @returns {string}
 */
function formatYmdToDash(ymd) {
    const year = ymd.slice(0, 4);
    const month = ymd.slice(4, 6);
    const day = ymd.slice(6, 8);
    return `${year}-${month}-${day}`;
}

/**
 * 기본 요청 데이터 생성
 * @returns {object}
 */
function getDefReqData() {
    return {
        corp_code: "",
        // bgn_de: "20200117", // 테스트용
        // end_de: "20200117", // 테스트용
        bgn_de: getTodayYMD,
        end_de: getTodayYMD,
        last_reprt_at: "",
        pblntf_ty: "B",
        pblntf_detail_ty: "",
        corp_cls: "Y",
        sort: "",
        sort_mth: "",
        page_no: "1",
        page_count: "100"
    };
}

/* --- NoticeBoard 컴포넌트 --- */
function NoticeBoard() {
    const [searchText, setSearchText] = useState('');
    const [rowData, setRowData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [today] = useState(getTodayYMD());

    // AG Grid 컬럼 정의 (메모이제이션)
    const columnDefs = useMemo(() => [
        { field: 'corp_cls', headerName: '구분', sortable: true, hide: true },
        { field: 'corp_name', headerName: '기업명', sortable: true, flex: 3 },
        { field: 'corp_code', headerName: '기업코드', sortable: true, hide: true },
        { field: 'stock_code', headerName: '종목코드', sortable: true, hide: true },
        { field: 'report_nm', headerName: '보고서명', sortable: true, flex: 4, cellRenderer: ReportNameRenderer },
        { field: 'rcept_no', headerName: '접수번호', sortable: true, hide: true },
        { field: 'flr_nm', headerName: '공시제출인', sortable: true, flex: 2 },
        { field: 'rcept_dt', headerName: '접수일자', sortable: true, flex: 2 },
        { field: 'rm', headerName: '비고', sortable: true, flex: 1 },
    ], []);

    // AG Grid 옵션 (메모이제이션)
    const gridOptions = useMemo(() => ({
        localeText: { noRowsToShow: '데이터가 없습니다' }
    }), []);

    // 검색어에 따른 데이터 필터링 (useCallback)
    const filterData = useCallback((list) => {
        return list.filter(item => item.corp_name.includes(searchText));
    }, [searchText]);

    // API 호출 및 데이터 업데이트 함수 (useCallback)
    const fetchNoticeList = useCallback(
        async (apiCall) => {
            setIsLoading(true);
            const sendUrl = `${GET_HOST()}${API_CONFIG.TRADE.NOTICE.URL}`;
            // window.location.hostname === "localhost"
            //     ? "http://localhost:18080/dart/disclosure/disc/list"
            //     : "/dart/disclosure/disc/list";
            try {
                const { data, error } = await apiCall(sendUrl, getDefReqData(), API_CONFIG.TRADE.NOTICE.METHOD);
                if (error) {
                    alert(`에러 발생: ${error}`);
                    setRowData([]);
                    setRowCount(0);
                } else if (data.status === '000') {
                    const list = data.list || [];
                    const filteredData = filterData(list);
                    setRowData(filteredData);
                    setRowCount(filteredData.length);
                }
            } catch (err) {
                console.error(err);
                alert('요청 중 오류가 발생했습니다.');
                setRowData([]);
                setRowCount(0);
            } finally {
                setIsLoading(false);
            }
        },
        [filterData]
    );

    // 페이지가 처음 열릴 때 한 번만 조회 (검색어 변경에 영향받지 않음)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchNoticeList(asyncSend);
    }, []);

    // 검색 폼 제출 핸들러 (send 사용)
    const handleSearch = async (e) => {
        e.preventDefault();
        await fetchNoticeList(send);
    };

    const onCellClicked = (e) => {
        // 특정 컬럼(여기서는 'corp_name' 컬럼)일 경우에만 이벤트 처리
        if (e.colDef.field === 'report_nm') {
            const rceptNo = e.data.rcept_no;
            window.open(`https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${rceptNo}`, '_blank');
        }
    }

    return (
        <BoardContainer>
            <LoadingOverlayComp isLoadingFlag={isLoading} />

            <Title>
                오늘의 주요사항 보고 <br /> {formatYmdToDash(today)}
            </Title>

            <form onSubmit={handleSearch}>
                <SearchBar>
                    <SearchInput
                        type="text"
                        placeholder="기업명을 입력해주세요"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <SearchButton type="submit">조회</SearchButton>
                </SearchBar>
            </form>

            <DataCount>{rowCount}건 (최대100건)</DataCount>

            <GridWrapper>
                <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                            flex: 1,
                            resizable: true,
                            sortable: true,
                        }}
                        gridOptions={gridOptions}
                        enableCellTextSelection={true}
                        onCellClicked={onCellClicked} // 셀 클릭 이벤트 등록
                    />
                </div>
            </GridWrapper>
        </BoardContainer>
    );
}

export default NoticeBoard;
