import React from 'react';
import { SearchButton, ResetButton } from '@components/btn/btnStyles/styles01';


const SearchBar = ({ sgubun, searchText, onSgubunChange, onSearchTextChange, onSearch, onReset }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <select
        value={sgubun}
        onChange={onSgubunChange}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      >
        {/* <option value="0">전체</option> */}
        <option value="1">제목</option>
        <option value="2">작성자</option>
        <option value="3">내용</option>
        <option value="4">제목, 내용</option>
      </select>
      <input
        type="text"
        placeholder="검색어 입력"
        value={searchText}
        onChange={onSearchTextChange}
        style={{
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          flexGrow: 1
        }}
      />
      <SearchButton onClick={onSearch}>검색</SearchButton>
      <ResetButton onClick={onReset}>초기화</ResetButton>
    </div>
  );
};

export default SearchBar;
