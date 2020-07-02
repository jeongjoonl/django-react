import React from 'react';

function StudentForm(props) {
  let mode="create";

  let name="";
  let age="";
  let gpa="";
  const category= props.location.state.category;

  function onCancel(e) {
    e.preventDefault();
    console.log(props.history);
    props.history.goBack();
  }

  return (
    <div>
      <h2>Student Form</h2>

      <form action="">
        <p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={name}
          />
        </p>
        <p>
          <input
            type="number"
            name="age"
            placeholder="Age"
            defaultValue={age}
          />
        </p>
        <p>
          <input
            type="number"
            name="gpa"
            placeholder="GPA"
            step="0.01"
            defaultValue={gpa}
          />
        </p>

        <label htmlFor="">Choose a Category: </label>
        <select
          name="category"
          defaultValue={category}
          required
        >
          <option value="">Select</option>
          <option value="person">Person</option>
          <option value="animal">Animal</option>
        </select>

        <p>
          {mode === "create" && <button type="button">Add</button>}
          {mode === "edit" && <button type="button">Save</button>}
          <button type="button" onClick={onCancel}>Cancel</button>
        </p>
      </form>
    </div>
  );
}

export default StudentForm;