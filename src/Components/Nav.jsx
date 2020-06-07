import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Education from "./areas/Education.tsx";
import Environment from "./areas/Environment.tsx";
import Military from "./areas/Military.tsx";
import Poverty from "./areas/Poverty.tsx";

function Nav() {
  return (
    <Router>
      <header className="navbar">
        <ul>
          <li>
            <NavLink
              className="education"
              activeClassName="active"
              to="/education"
            >
              <span>Education</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="environment"
              activeClassName="active"
              to="/environment"
            >
              <span>Environment</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="military"
              activeClassName="active"
              to="/military"
            >
              <span>Military</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="poverty" activeClassName="active" to="/poverty">
              <span>Poverty</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="home" activeClassName="active" to="/">
              <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </header>
      <hr />
      <Switch>
        <Route path="/education" component={Education} />
        <Route path="/environment" component={Environment} />
        <Route path="/military" component={Military} />
        <Route path="/poverty" component={Poverty} />
      </Switch>
    </Router>
  );
}

export default Nav;
