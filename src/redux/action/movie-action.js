import axios from "axios";
import { GET_MOVIE_SUCCESS, GET_MOVIE_FAILED } from "./types";
import { APIURL } from "../../helper/ApiUrl";

export const onGetMovieAction = (page) => {
  return (dispatch) => {
    axios
      .get(`${APIURL}${page}`)
      .then((res) => {
        const data = res.data.Search.map((val) => ({ ...val, value: val.Title }));
        dispatch({ type: GET_MOVIE_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: GET_MOVIE_FAILED, payload: err });
      });
  };
};
