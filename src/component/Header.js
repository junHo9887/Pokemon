import '../css/Header.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logoutSuccess } from '../actions'; // logoutSuccess action 추가

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isAuthenticated);

  const handleLogin = () => {
    dispatch(login(true));
  };

  const handleLogout = () => {
    dispatch(logoutSuccess()); // 로그아웃 버튼 클릭 시 logoutSuccess action dispatch
  };

  return (
    <div className="Header">
      <div className='logo'>
        <Link to="/"></Link>
      </div>
      <div className='sub'>
        <Link to="/">
          <img src='../image/Ball.png' alt="포켓몬도감"></img>
          <p>포켓몬도감</p>
        </Link>
        {isLoggedIn ? (
            <Link to="/login.js" onClick={handleLogout}>
              <img src='../image/Login.png' alt="로그아웃"></img>
              <p>로그아웃</p>
            </Link>
        ) : (
            <Link to="/login.js">
              <img src='../image/Login.png' alt="로그인"></img>
              <p>로그인</p>
            </Link>
        )}
        <Link to="/favorites.js">
          <img src='../image/Heart.png' alt="즐겨찾기"></img>
          <p>즐겨찾기</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;