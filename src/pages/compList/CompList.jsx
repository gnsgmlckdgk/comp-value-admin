import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

// AG-Grid
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, ClientSideRowModelModule, RowDragModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { send } from '../../components/util/clientUtil';
import LoadingOverlayComp from '../../components/common/ui/LoadingOverlay';


ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowDragModule
]);

// 디자인 관련 컨테이너들
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
  font-size: 1.5rem;
  text-align: center;
  color: #181a31;

  @media (max-width: 768px) {
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
  font-size: 1rem;

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
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 8px;
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

const CompList = () => {
  const [searchText, setSearchText] = useState('');
  const [rowData, setRowData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // AG Grid 컬럼 정의 (useMemo로 고정)
  const columnDefs = useMemo(() => [
    { field: 'corpCode', headerName: '기업코드', sortable: true, rowDrag: false },
    { field: 'corpName', headerName: '기업명', sortable: true },
    { field: 'stockCode', headerName: '종목코드', sortable: true },
    { field: 'modifyDate', headerName: '갱신일', sortable: true },
  ], []);

  // AG Grid 옵션 (useMemo 사용)
  const gridOptions = useMemo(() => ({
    localeText: {
      noRowsToShow: "데이터가 없습니다"
    }
  }), []);

  // 검색 버튼 핸들러: API 호출 후, 결과 필터링
  const handleSearch = async (e) => {
    e.preventDefault();

    const sendUrl = window.location.hostname === "localhost"
      ? "http://localhost:18080/dart/disclosure/corpCode"
      : "/dart/disclosure/corpCode";

    setIsLoading(true);
    const { data, error } = await send(sendUrl, {});

    // console.log("data", data);
    // console.log("error", error);

    if (error) {
      alert(error);
      console.error(error);
      setRowData([]);
      setRowCount(0);
    } else if (data?.list) {
      const filteredData = data.list.filter(item =>
        item.corpName.includes(searchText)
      );
      setRowData(filteredData);
      setRowCount(filteredData.length);
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
          <SearchButton>조회</SearchButton>
        </SearchBar>
      </form>

      <DataCount>{rowCount}건</DataCount>

      <div style={{ zIndex: 1, position: 'relative' }}>
        <GridWrapper>
          <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                flex: 1,
                resizable: true,
                sortable: true,
                rowDrag: true,
              }}
              rowDragManaged={true}
              enableCellTextSelection={true}
              gridOptions={gridOptions}
            />
          </div>
        </GridWrapper>
      </div>
    </BoardContainer>
  );
};

export default CompList;
