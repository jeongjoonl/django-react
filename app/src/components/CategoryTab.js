import React from 'react';

function CategoryTab({ onChange }) {
  function onNavigate(e) {
    e.preventDefault();
    onChange(e.target.name);
  }

  return (
    <nav>
      <ul>
        <li>
          <a
            href="/"
            name="all"
            onClick={onNavigate}
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="/person/"
            name="person"
            onClick={onNavigate}
          >
            Person
          </a>
        </li>

        <li>
          <a
            href="/animal/"
            name="animal"
            onClick={onNavigate}
          >
            Animal
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default CategoryTab;