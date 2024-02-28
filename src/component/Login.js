import '../css/Login.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux'; // useSelector 제거
import {login} from '../actions'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    const storedUsername = localStorage.getItem('username'); // 수정: 'id'로 저장된 아이디 가져오기
    const storedPassword = localStorage.getItem('password'); // 수정: 'pw'로 저장된 비밀번호 가져오기
    
    if (storedUsername && storedPassword) {
      if (username === storedUsername && password === storedPassword) {
        dispatch(login(true));
        navigate('/');
      } else {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } else {
      alert('회원가입을 먼저 진행해주세요.');
    }
  };

  return (
    <div className="Login">
      <div className='inner'>
        <div className='logo'></div>
        <p>로그인</p>
        <form>
          <input
            type='text'
            placeholder='아이디'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}><p>로그인</p></button>
        </form>
        <Link to="/join.js"> <p>아직 회원이 아니신가요?</p></Link>
       </div>
    </div>
  );
}

export default Login;