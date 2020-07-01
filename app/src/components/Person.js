import React from 'react';

function Person(props) {
  function onCreate() {
    props.history.push("/student/create");
  }

  return (
    <div>
      <h2>Person</h2>
      <button type="button" onClick={onCreate}>Add</button>
    </div>
  );
}

export default Person;