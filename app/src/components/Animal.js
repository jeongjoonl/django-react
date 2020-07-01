import React from 'react';

function Animal(props) {
  function onCreate() {
    props.history.push("/student/create");
  }

  return (
    <div>
      <h2>Animal</h2>
      <button type="button" onClick={onCreate}>Add</button>
    </div>
  );
}

export default Animal;