import {
  UPDATE_POSTS,
  APPLY_POST,
  SEARCH_POSTS,
  START_SEARCH,
  USER_POSTS,
  APPLY_POST_END,
  ADD_APPLIED,
} from '../actions/actionTypes';

const initialPostState = {
  Posts: [],
  SearchPosts: [],
  UserPosts: [],
  AppliedPosts: [],
  apply: false,
  message: null,
  inSearchProgress: false,
};

export default function posts(state = initialPostState, action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return {
        ...state,
        Posts: action.posts,
      };
    case APPLY_POST:
      return {
        ...state,
        message: null,
        apply: false,
      };
    case APPLY_POST_END:
      return {
        ...state,
        apply: true,
        message: action.message,
      };
    case SEARCH_POSTS:
      return {
        ...state,
        SearchPosts: action.posts,
        inSearchProgress: false,
      };
    case START_SEARCH:
      return {
        ...state,
        inSearchProgress: true,
      };
    case USER_POSTS:
      return {
        ...state,
        UserPosts: action.posts,
      };
    case ADD_APPLIED:
      return {
        ...state,
        AppliedPosts: [...state.AppliedPosts, action.posts],
      };
    default:
      return state;
  }
}
