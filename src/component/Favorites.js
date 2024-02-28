import '../css/Favorites.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

function Favorites() {
  const isLoggedIn = useSelector(state => state.isAuthenticated);
  const clickedPokemon = useSelector(state => state.clickedPokemon);
  const navigate = useNavigate();
  const [rotationStates, setRotationStates] = useState({}); // 각 카드의 회전 상태를 관리하기 위한 상태

  if (!isLoggedIn) {
    return <Navigate to="/login.js" />;
  }

  const handleMouseMove = (e, index) => {
    // 카드의 너비와 높이를 계산
    const cardWidth = e.target.offsetWidth;
    const cardHeight = e.target.offsetHeight;

    // 마우스 좌표에 따라 회전 각도 계산
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const centerX = e.target.getBoundingClientRect().left + cardWidth / 2;
    const centerY = e.target.getBoundingClientRect().top + cardHeight / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const rotationY = dx * 0.3;
    const rotationX = -dy * 0.3;
    
    // 회전 상태 업데이트
    setRotationStates(prevStates => ({
      ...prevStates,
      [index]: { x: rotationX, y: rotationY }
    }));
  };

  const handleMouseLeave = (index) => {
    // 마우스가 요소를 벗어났을 때 해당 카드의 회전 상태 초기화
    setRotationStates(prevStates => ({
      ...prevStates,
      [index]: { x: 0, y: 0 }
    }));
  };

  const handleClick = (pokemon) => {
    navigate(`/Sub?query=${pokemon.name}`);
  };

  const renderClickedPokemon = () => {
    if (clickedPokemon) {
      return (
        clickedPokemon.map((pokemon, index) => (
          <div
            className="clicked-pokemon"
            key={index}
            style={{
              transform: `perspective(1000px) rotateX(${rotationStates[index]?.x || 0}deg) rotateY(${rotationStates[index]?.y || 0}deg)`,
              transition: 'transform 0.5s ease' // CSS transition 추가
            }}
            onClick={() => handleClick(pokemon)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>이름: {pokemon.name}</p>
            <p>키: {pokemon.Weight}cm</p>
            <p>몸무게: {pokemon.Height}kg</p>
          </div>
        ))
      );
    }
  };

  return (
    <div className="Favorites">
      <div className='inner'>
        <div className='F_wrap'>
          <div className='F1'>
            <p>나만의도감</p>
          </div>
          <div className='F2'>
            {renderClickedPokemon()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;