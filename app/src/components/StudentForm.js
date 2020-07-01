import React from 'react';

function StudentForm() {
  let mode="create";

  let name="";
  let age="";
  let gpa="";
  let category="unknown";



  return (
    <div>
      <h2>Student Form</h2>

      <form action="">
        <p>
          <input
            type="text"
            placeholder="Name"
            defaultValue={name}
          />
        </p>
        <p>
          <input
            type="number"
            placeholder="Age"
            defaultValue={age}
          />
        </p>
        <p>
          <input
            type="number"
            placeholder="GPA"
            step="0.01"
            defaultValue={gpa}
          />
        </p>

        <label htmlFor="">Choose a Category: </label>
        <select
          name="category"
          defaultValue={category}
        >
          <option value="unknown">Unknown</option>
          <option value="person">Person</option>
          <option value="animal">Animal</option>
        </select>

        <p>

          {mode === "create" && <button type="button">Add</button>}
          {mode === "edit" && <button type="button">Save</button>}
          <button type="button">Cancel</button>
        </p>
      </form>
    </div>
  );
}

export default StudentForm;