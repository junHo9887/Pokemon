import { useState } from 'react';
import axios from 'axios';
import '../css/Join.css';
import { useNavigate } from 'react-router';

function Join() {
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
		confirmPassword: '',
  });

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const saveLocalStorage = (form) => {
    localStorage.setItem('username', form.username); // 수정: 'id' -> 'username'
    localStorage.setItem('password', form.password); // 수정: 'pw' -> 'password'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (!userForm.username) {
      setUsernameError(true);
      return;
    }

    if (!userForm.password) {
      setPasswordError(true);
      return;
    }

    if (userForm.password !== userForm.confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    try {
      alert('가입이 완료되었습니다.');
      saveLocalStorage(userForm);
      navigate('/login.js'); 
    } catch (error) {
      alert('에러가 발생했습니다.');
    }
  };

  return (
    <div className="Join">
      <div className='inner'>
        <div className="container">
          <div className='logo'></div>
          <h2 className="h4">회원가입</h2>
          <div className="form-wrp">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="아이디를 입력해주세요."
              value={userForm.username}
              onChange={handleInputChange}
            />
            <div className="feedback">아이디를 작성해 주시기 바랍니다.</div>
            {usernameError && <div className="error-feedback">아이디를 입력해 주세요.</div>}
          </div>
          <div className="form-wrp">
            <input
              type="password"
              className={`form-control ${passwordError ? 'error' : ''}`}
              name="password"
              placeholder="비밀번호"
              value={userForm.password}
              onChange={handleInputChange}
            />
            <div className="feedback">비밀번호를 입력해 주기기 바랍니다.</div>
            {passwordError && <div className="error-feedback">비밀번호를 입력해주세요.</div>}
          </div>
          <div className="form-wrp">
            <input
              type="password"
              className={`form-control ${confirmPasswordError ? 'error' : ''}`}
              name="confirmPassword"
              placeholder="위에 입력한 비밀번호와 동일한 비밀번호를 입력해주세요."
              value={userForm.confirmPassword}
              onChange={handleInputChange}
            />
            <div className="feedback">비밀번호를 확인을 위하여 다시 한번 작성해 주시기 바랍니다.</div>
            {confirmPasswordError && <div className="error-feedback">비밀번호가 일치하지 않습니다.</div>}
          </div>
          <button className='Join_b' onClick={handleJoin}><p>가입</p></button>
        </div>
      </div>
    </div>
  );
}

export default Join;