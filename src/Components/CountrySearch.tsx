import React from "react";

interface OwnState {
  searchTerm: string;
}

class CountrySearch extends React.PureComponent<OwnState> {
  public state = {
    searchTerm: "",
  };

  render() {
    return <div> hello </div>;
  }
}

export default CountrySearch;
