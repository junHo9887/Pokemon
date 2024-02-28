import { FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCESS, FETCH_POKEMON_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_CLICKED_POKEMON } from './actions';

const initialState = {
  pokemonList: [],
  loading: false,
  error: null,
  isAuthenticated: false,
  clickedPokemon: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMON_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemonList: action.payload,
        error: null
      };
    case FETCH_POKEMON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case LOGIN_SUCCESS: // 로그인 성공 액션 처리
      return {
        ...state,
        isAuthenticated: true
      };
      case LOGOUT_SUCCESS :
        return {
          ...state,
          isAuthenticated: false,
        };
        case SET_CLICKED_POKEMON: // 클릭한 포켓몬 정보를 스토어에 저장
        return {
          ...state,
          clickedPokemon: [...state.clickedPokemon, action.payload]
        };
        case 'REMOVE_CLICKED_POKEMON':
          return {
            ...state,
            clickedPokemon: state.clickedPokemon.filter(pokemon => pokemon.name !== action.payload.name)
          };
    default:
      return state;
  }
};

export default reducer;