import { Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import Favorites from './component/Favorites';
import Login from './component/Login';
import Join from './component/Join';
import Sub from './component/Sub';
import './css/App.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Favorites.js" element={<Favorites />}/>
        <Route path="/Join.js" element={<Join />}/>
        <Route path="/Login.js" element={<Login />}/>
        <Route path="/Sub" element={<Sub />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
