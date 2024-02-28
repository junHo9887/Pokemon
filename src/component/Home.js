import '../css/Home.css';
import ListCard from './ListCard';
import Search from './Search';

function Home() {
  return (
    <div className="Home">
       <div className='inner'>
        <Search/>
        <ListCard/>
       </div>
    </div>
  );
}

export default Home;
