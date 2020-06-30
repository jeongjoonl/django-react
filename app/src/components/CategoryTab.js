import React from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';

function CategoryTab() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            name="all"
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/person/"
            name="person"
          >
            Person
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/animal/"
            name="animal"
          >
            Animal
          </NavLink>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          Home
        </Route>
        <Route path="/person/">
          Person
        </Route>
        <Route path="/animal/">
          Animal
        </Route>
        <Route path="/">
          Not Found
        </Route>
      </Switch>
    </nav>
  );
}

export default CategoryTab;