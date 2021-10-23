import { GET_MOVIE_SUCCESS, GET_MOVIE_FAILED } from "./../action/types";

const INITIAL_STATE = {
  movies: [],
  loading: true,
  error: "",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOVIE_SUCCESS:
      return { ...INITIAL_STATE, movies: [...state.movies, ...action.payload], loading: false };
    case GET_MOVIE_FAILED:
      return { ...INITIAL_STATE, error: action.payload, loading: false };
    default:
      return state;
  }
};
