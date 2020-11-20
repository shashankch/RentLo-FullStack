import {
  UPDATE_POSTS,
  APPLY_POST,
  SEARCH_POSTS,
  START_SEARCH,
  USER_POSTS,
  APPLY_POST_END,
  ADD_APPLIED,
  LOG_OUT
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(updatePosts(data.assets));
      });
  };
}
export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function applyPosts() {
  return {
    type: APPLY_POST,
  };
}

export function applyPostsEnd(message) {
  return {
    type: APPLY_POST_END,
    message,
  };
}

export function searchPosts(posts) {
  return {
    type: SEARCH_POSTS,
    posts,
  };
}

export function startSearch() {
  return {
    type: START_SEARCH,
  };
}

export function addAppliedPosts(posts) {
  return {
    type: ADD_APPLIED,
    posts,
  };
}

export function getAssets(posts) {
  return {
    type: USER_POSTS,
    posts,
  };
}

export function applyOnProperty(user, asset) {
  return (dispatch) => {
    const url = APIUrls.applyPosts(user, asset);
    const token = localStorage.getItem('token');
    console.log('are yeh url:', url);
    fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if(!response.ok){
          dispatch({ type: LOG_OUT});
          localStorage.removeItem('token');
        }
        return response.json()})
      .then((data) => {
        console.log('are idhar :', data);

        dispatch(applyPosts());
        dispatch(addAppliedPosts(asset));
        dispatch(applyPostsEnd(data.message));
      });
  };
}

export function searchProperty(location, rent, size) {
  return (dispatch) => {
    dispatch(startSearch());
    const url = APIUrls.searchPosts();

    console.log('are yeh url:', url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ location, rent, size }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('are idhar :', data);

        dispatch(searchPosts(data.assets));
      });
  };
}

export function getAssetsbyUser(user) {
  return (dispatch) => {
    const url = APIUrls.getAssets(user);
    console.log('abe:', url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(getAssets(data.assets));
      });
  };
}
