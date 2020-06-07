import React from "react";
import "./App.css";
import Nav from "./Components/Nav.jsx";
// import CountrySearch from "./Components/CountrySearch.tsx";
// import RenderCountries from "./Components/RenderCountries.tsx";
import { Router } from "react-router-dom";
import history from "./history";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <header className="App-header">
          <p>World Stats that matter</p>
        </header>
        <div>
          <Nav />
          {/* <CountrySearch />
          <RenderCountries /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
