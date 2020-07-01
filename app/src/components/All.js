import React from 'react';

function All(props) {
  function onCreate() {
    props.history.push("/student/create");
    debugger;
  }
  return (
    <div>
      <h2>All</h2>
      <button type="button" onClick={onCreate}>Add</button>
    </div>
  );
}

export default All;