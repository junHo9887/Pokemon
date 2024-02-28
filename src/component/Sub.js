import React, { useEffect, useState } from 'react';
import '../css/Sub.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon, setClickedPokemon, removeClickedPokemon } from '../actions'; // 추가: removeClickedPokemon 액션 임포트
import Search from './Search';
import Loading from './Loading';
import Error from './Error';
import { useLocation, useNavigate } from 'react-router-dom';

const Sub = () => {
  const dispatch = useDispatch();
  const { pokemonList, loading, error } = useSelector(state => ({
    pokemonList: state.pokemonList,
    loading: state.loading,
    error: state.error
  }));

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pokemonName = searchParams.get('query');

  const sPokemon = pokemonList.find((pokemon, i) => pokemon.name === pokemonName);
  const storageKey = pokemonName ? `isClicked_${pokemonName}` : null;
  const [imageSrc, setImageSrc] = useState(localStorage.getItem(storageKey) === 'true' ? "./image/Heartf.png" : "./image/Heartr.png");
  const [isClicked, setIsClicked] = useState(localStorage.getItem(storageKey) === 'true');
  const isLoggedIn = useSelector(state => state.isAuthenticated);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      const newIsClicked = !isClicked;
      if (newIsClicked) {
        // 클릭된 상태인 경우
        dispatch(setClickedPokemon(sPokemon));
        localStorage.setItem(storageKey, 'true');
        setImageSrc("./image/Heartf.png");
      } else {
        // 클릭되지 않은 상태인 경우
        dispatch(removeClickedPokemon(sPokemon));
        localStorage.removeItem(storageKey);
        setImageSrc("./image/Heartr.png");
      }
      setIsClicked(newIsClicked);
    } else {
      navigate('/login.js');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!pokemonList || pokemonList.length === 0 || (!pokemonName) || !sPokemon) {
    return <Error />;
  }

  // 스타일지정
  const p_color = {
    backgroundColor: sPokemon.color
  };
  const d_color = {    
  boxShadow: `3px 3px 8px ${sPokemon.color}`,
  boxShadowColor:  sPokemon.color
};

  return (
    <div className='Sub'>
      <div className='inner'>
        <Search />
        <div className='card2' style={d_color} >
          <div className='c1'>
            <img src={sPokemon.imageUrl} alt={sPokemon.name} />
          </div>
          <div className='c2'>
            <h2>{sPokemon.name}</h2>
            <p id="type" style={p_color}>{sPokemon.genera}</p>
            <p>{sPokemon.flavor}</p>
            <p>키: {sPokemon.Height}cm</p>
            <p>몸무게: {sPokemon.Weight}kg</p>
            <div className='heart'>
              <img id='heart' src={imageSrc} onClick={handleClick} alt="heart"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sub;