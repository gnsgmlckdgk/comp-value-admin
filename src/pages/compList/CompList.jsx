// Board.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { sendGet } from '../../components/util/clientUtil'
import LoadingOverlayComp from '../../components/common/LoadingOverlay'


// 디자인 관련 컨테이너들
const BoardContainer = styled.div`
  /* 레이아웃 안에 들어갈 컨테이너:
     배경색은 흰색 박스로 해서, 사이트 전체(어두운 그라디언트)와 구분 */
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
  /* AG Grid의 테마(ag-theme-alpine 등)를 감싸는 컨테이너 */
  width: 100%;
  height: 600px;

  .ag-theme-alpine {
    /* 필요시 기본 색상이나 폰트 조정 */
    font-family: inherit;
    /* 예: background-color: #f8f9fa; */
  }
`;

const Board = () => {
  const [searchText, setSearchText] = useState('');
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // AG Grid 컬럼 정의
  const [columnDefs] = useState([
    { field: 'corpCode', headerName: '기업코드', sortable: true, rowDrag: false },
    { field: 'corpName', headerName: '기업명', sortable: true },
    { field: 'stockCode', headerName: '종목코드', sortable: true },
    { field: 'modifyDate', headerName: '갱신일', sortable: true },
  ]);

  const gridOptions = {
    localeText: {
      noRowsToShow: "데이터가 없습니다" // 기본 "No Rows To Show" 문구를 한글로 변경
      // 그 외 필요하면 다른 문구들도 localeText에서 변경 가능
    }
  };

  // 검색 버튼 (실제로는 API 호출하여 필터된 데이터 재조회 등)
  const handleSearch = async (e) => {

    const sendUrl = "http://localhost:18080/dart/disclosure/corpCode";

    setIsLoading(true);
    const { data, error } = await sendGet(sendUrl, {});

    if (error) {
      alert(error);
      console.log(error);
      setRowData([]);
    } else {
      const filteredData = data.list.filter(item => {
        return item.corpName.includes(searchText);
      });
      setRowData(filteredData);
    }
    setIsLoading(false);
  };

  return (

    <BoardContainer>

      <LoadingOverlayComp isLoadingFlag={isLoading} />

      <Title>기업목록</Title>
      <form onSubmit={handleSearch}>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="기업명을 입력해주세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>조회</SearchButton>
        </SearchBar>
      </form>

      <GridWrapper>
        {/* ag-theme-alpine 테마 사용 */}
        <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
          <AgGridReact
            modules={[ClientSideRowModelModule]}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              flex: 1,
              resizable: true,
              sortable: true,
              enableRowGroup: true,
              rowDrag: true, // 열 순서 변경(드래그)등도 가능
            }}
            rowDragManaged={true}
            enableCellTextSelection={true}
            gridOptions={gridOptions}
          />
        </div>
      </GridWrapper>
    </BoardContainer>
  );
};

export default Board;
