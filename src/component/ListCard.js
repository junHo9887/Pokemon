import React, { useEffect } from 'react';
import '../css/ListCard.css';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import Error from './Error';
import { fetchPokemon } from '../actions';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch, useSelector 추가

const ListCard = () => {
  const dispatch = useDispatch();
  const { pokemonList, loading, error } = useSelector(state => ({
    pokemonList: state.pokemonList,
    loading: state.loading,
    error: state.error
  }));

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!pokemonList || pokemonList.length === 0) {
    return <Error />;
  }

  return (
    <div className='card'>
      {pokemonList.map((pokemon, index) => {
        const p_color = {
        };

        return (
          <Link key={index} style={p_color} to={`Sub?query=${pokemon.name}`}>
            <img id="p" src={pokemon.imageUrl} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ListCard;