import '../css/Search.css';
import React, { useState } from 'react';

function Search() {
    const [SearchQuery, setSearchQuery] = useState('');
    
    const handleSearchClick = () => {
      if (!SearchQuery) {
        alert('검색어를 입력하세요.'); // 검색어가 비어있을 때 경고창 표시
      } else {
        // 검색어가 입력된 경우 검색 페이지로 이동
        window.location.href = `/Sub?query=${SearchQuery}`;
      }
    };

  return (
    <div className='Search'>
      <input  type="text"
          placeholder="포켓몬을 입력하세요"
          value={SearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}/>
          <div onClick={handleSearchClick}/>
    </div>
  );
}

export default Search;
