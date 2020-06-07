import { SET_SEARCH_TERM } from "../Actions/actions";

export function setCountrySearch(searchTerm) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}
