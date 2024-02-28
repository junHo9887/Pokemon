import '../css/Footer.css';
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className="Footer">
       <div className='inner'>
          <Link to="/"></Link>
          <p>본 페이지는  개인 포트폴리오 용으로 재작되었으며 상업용 으로 제작되지 않았습니다</p>
          <div className='back1'></div>
          <div className='back2'></div>
       </div>
    </div>
  );
}

export default Footer;
