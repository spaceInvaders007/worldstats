import SET_SEARCH_TERM from "../Actions/actions";

const DEFAULT_STATE = {
  searchTerm: "",
};

const setCountrySearch = (state, action) => {
  return Object.assign({}, state, { searchTerm: action.payload });
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return setCountrySearch(state, action);
    default:
      return state;
  }
};

export default rootReducer;
