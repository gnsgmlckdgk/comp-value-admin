import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// 로딩 오버레이 (선택)
import LoadingOverlayComp from '../../../components/common/LoadingOverlay';

// 서버 통신 함수 (가정)
import { send, asyncSend } from '../../../components/util/clientUtil';
import { ListPlus } from 'lucide-react';

/* --- 스타일들 --- */
const BoardContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 1.5rem;
  text-align: center;
  color: #181a31;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
`;

const GridWrapper = styled.div`
  width: 100%;
  height: 600px;

  .ag-theme-alpine {
    font-family: inherit;
  }
`;

const DataCount = styled.div`
  display: block;
  text-align: right;
  font-size: 1em;
`;


/* 함수 */
/**
 * 오늘 날짜(yyyyMMdd)
 * @returns 
 */
function getTodayYMD() {
    const today = new Date();

    const year = today.getFullYear();

    // getMonth()는 0부터 시작하므로 +1 해줌
    const month = String(today.getMonth() + 1).padStart(2, '0');

    // getDate()가 1~31 범위
    const day = String(today.getDate()).padStart(2, '0');

    // "YYYYMMDD" 형태로 합침
    return `${year}${month}${day}`;
}

/**
 * yyyyMMdd -> yyyy-MM-dd
 * @param {*} ymd 
 * @returns 
 */
function formatYmdToDash(ymd) {
    // ymd가 "YYYYMMDD" (예: "20250130")라는 전제
    const year = ymd.slice(0, 4);  // "2025"
    const month = ymd.slice(4, 6); // "01"
    const day = ymd.slice(6, 8);   // "30"

    return `${year}-${month}-${day}`; // "2025-01-30"
}


/* --- NoticeBoard 컴포넌트 --- */
function NoticeBoard() {
    const [searchText, setSearchText] = useState('');
    const [rowData, setRowData] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [today, setToday] = useState(getTodayYMD());

    // AG Grid 컬럼 정의 (새로운 데이터 구조에 맞춰 작성)
    const [columnDefs] = useState([
        { field: 'corp_cls', headerName: '구분', sortable: true, hide: true },
        { field: 'corp_name', headerName: '기업명', sortable: true, flex: 3 },
        { field: 'corp_code', headerName: '기업코드', sortable: true, hide: true },
        { field: 'stock_code', headerName: '종목코드', sortable: true, hide: true },
        { field: 'report_nm', headerName: '보고서명', sortable: true, flex: 4 },
        { field: 'rcept_no', headerName: '접수번호', sortable: true, hide: true },
        { field: 'flr_nm', headerName: '공시제출인', sortable: true, flex: 2 },
        { field: 'rcept_dt', headerName: '접수일자', sortable: true, flex: 2 },
        { field: 'rm', headerName: '비고', sortable: true, flex: 1 },
    ]);

    // AG Grid localeText 등
    const gridOptions = {
        localeText: {
            noRowsToShow: '데이터가 없습니다'
        }
    };

    const getDefReqData = () => {

        return {
            "corp_code": "",
            // "bgn_de": today,
            // "end_de": today,
            "bgn_de": "20200117",   // 테스트용
            "end_de": "20200117",   // 테스트용
            "last_reprt_at": "",
            "pblntf_ty": "B",
            "pblntf_detail_ty": "",
            "corp_cls": "Y",
            "sort": "",
            "sort_mth": "",
            "page_no": "1",
            "page_count": "100"
        };
    }

    // 검색 함수 (corp_name 에 searchText가 포함되는지 필터)
    const handleSearch = async (e) => {
        e?.preventDefault();    // useEffect가 호출해도 실행될수 있게 ? 추가
        setIsLoading(true);

        // 예: API 엔드포인트 가정
        const sendUrl = 'http://localhost:18080/dart/disclosure/disc/list';

        // 실제로는 send 등 서버 요청
        const { data, error } = await send(sendUrl, getDefReqData(), "POST");
        if (error) {
            alert(`에러 발생: ${error}`);
            setRowData([]);
            setRowCount(0);
        } else {
            // data가 위 JSON 형태로 [{ corp_cls:..., corp_name:..., ... }, ...]
            // 검색 로직
            if (data.status === '000') {
                const list = data.list;

                const filteredData = list.filter(item =>
                    item.corp_name.includes(searchText)
                );
                setRowData(filteredData);
                setRowCount(filteredData.length);
            }
        }

        setIsLoading(false);
    };

    const initSearch = (e) => {
        e?.preventDefault();    // useEffect가 호출해도 실행될수 있게 ? 추가
        setIsLoading(true);

        // 예: API 엔드포인트 가정
        const sendUrl = 'http://localhost:18080/dart/disclosure/disc/list';

        // 실제로는 send 등 서버 요청
        asyncSend(sendUrl, getDefReqData(), "POST")
            .then(({ data, error }) => {
                if (error) {
                    alert(`에러 발생: ${error}`);
                    setRowData([]);
                    setRowCount(0);
                } else {
                    const list = data.list || [];
                    const filteredData = list.filter(item =>
                        item.corp_name.includes(searchText)
                    );
                    setRowData(filteredData);
                    setRowCount(filteredData.length);
                }

            }).catch(err => {
                // 네트워크 오류 등 처리
                console.log(err);
                alert('요청 중 오류가 발생했습니다.');
                setRowData([]);
                setRowCount(0);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    // 컴포넌트가 처음 렌더된 직후, 자동 실행
    useEffect(() => {
        initSearch();
    }, [])

    return (
        <BoardContainer>
            {/* 로딩중 오버레이 (선택) */}
            <LoadingOverlayComp isLoadingFlag={isLoading} />

            <Title>오늘의 주요사항 보고 <br /> {formatYmdToDash(today)}</Title>
            {/* 검색 폼 */}
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

            {/* 데이터 건수 표시 */}
            <DataCount>{rowCount}건 (최대100건)</DataCount>

            <GridWrapper>
                <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
                    <AgGridReact
                        modules={[ClientSideRowModelModule]}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                            flex: 1,
                            resizable: true,
                            sortable: true,
                        }}
                        gridOptions={gridOptions}
                        enableCellTextSelection={true}
                    />
                </div>
            </GridWrapper>
        </BoardContainer>
    );
}
export default NoticeBoard;
