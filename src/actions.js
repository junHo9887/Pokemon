import axios from 'axios';

// fetchPokemon 함수
export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';

// 로그인부분
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const fetchPokemonRequest = () => ({
  type: FETCH_POKEMON_REQUEST
});

export const fetchPokemonSuccess = data => ({
  type: FETCH_POKEMON_SUCCESS,
  payload: data // 수정 필요: 실제 Pokemon 데이터를 전달해야 함
});

export const fetchPokemonFailure = error => ({
  type: FETCH_POKEMON_FAILURE,
  payload: error
});

// 로그인부분
export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});


//로그인
export const login = (isAuthenticated) => {
  return dispatch => {
    dispatch(loginRequest());
    try {
      dispatch(loginSuccess(isAuthenticated));
    } catch (error) {
      dispatch(loginFailure());
    }
  };
};

//로그아웃
export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// 즐겨찾기
export const SET_CLICKED_POKEMON = 'SET_CLICKED_POKEMON';

export const setClickedPokemon = (pokemon) => {
  return {
    clickedPokemon: [],
    type: SET_CLICKED_POKEMON,
    payload: pokemon
  };
};
export const removeClickedPokemon = (pokemonName) => {
  return {
    type: 'REMOVE_CLICKED_POKEMON',
    payload: pokemonName
  };
};

// fetchPokemon 함수 수정
export const fetchPokemon = () => {
  return async dispatch => {
    dispatch(fetchPokemonRequest());
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0&');
      const pokemonList = await Promise.all(response.data.results.map(async (pokemon,i) => {
        const detailResponse = await axios.get(pokemon.url);
        return {
          name: korean[i],
          imageUrl: detailResponse.data.sprites.front_default,
          color : color[i],
          genera : genera[i],
          flavor : flavor[i],
          Height : Height[i],
          Weight : Weight[i],
          type : type[i]
        };
      }));
      dispatch(fetchPokemonSuccess(pokemonList));

    } catch (error) {
      dispatch(fetchPokemonFailure(error.message));
    }
  };
};

const korean = [];
const urls = [];
const flavor = [];
const genera =[];
const color =[];

for (let i = 0; i < 200; i++) {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;
  urls.push(url);
}

Promise.all(urls.map(url => fetch(url)))
  .then(responses => Promise.all(responses.map(res => res.json())))
  .then(results => {
    for (let result of results) {
      korean.push(result.names[2].name);
      genera.push(result.genera[1].genus);
      color.push(result.color.name);
      
      const koreanFlavor = result.flavor_text_entries.find(entry => entry.language.name === "ko");
      if (koreanFlavor) {
        flavor.push(koreanFlavor.flavor_text);
      }
    }
    fetchPokemon();
  });

  const Weight =[];
  const Height =[];
  const urls1 = [];
  const type =[];

  for (let i = 0; i < 200; i++) {
    let url1 = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    urls1.push(url1);
  }
  
  Promise.all(urls1.map(url => fetch(url)))
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(results => {
      for (let result of results) {
        Weight.push(result.weight);
        Height.push(result.height);
        type.push(result.types.type)
      }
      fetchPokemon();
    });