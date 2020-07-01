import React from 'react';
import {Link, NavLink} from 'react-router-dom';

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
          <Link
            to="/animal/"
            name="animal"
          >
            Animal
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default CategoryTab;