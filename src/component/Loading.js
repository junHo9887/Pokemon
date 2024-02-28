import '../css/Loading.css';
import React from 'react';
import Spinner from '../Ball1.gif';

export default () => {
  return (
    <div className="Loading">
      <img src={Spinner} alt="로딩중" width="5%" />
    </div>
  );
};



