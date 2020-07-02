import React from 'react';

function StudentForm(props) {

  const data = props.location.state.data;
  let mode = data ? "edit" : "create";

  function onAdd(e) {
    const form = e.target.for;

  }

  function onSave(e) {
    const form = e.target.form;
  }

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
            defaultValue={data ? data.name : ""}
          />
        </p>
        <p>
          <input
            type="number"
            name="age"
            placeholder="Age"
            defaultValue={data ? data.age : undefined}
          />
        </p>
        <p>
          <input
            type="number"
            name="gpa"
            placeholder="GPA"
            step="0.01"
            defaultValue={data ? data.gpa : undefined}
          />
        </p>

        <label>Choose a category: </label>
        <select
          name="category"
          defaultValue={data ? data.category : undefined}
          required
        >
          <option value="">Select</option>
          <option value="person">Person</option>
          <option value="animal">Animal</option>
        </select>

        <p>
          {mode === "create" &&
            <button
              type="button"
              onClick={onAdd}
            >
              Add
            </button>
          }

          {mode === "edit" &&
            <button
              type="button"
              onClick={onSave}
            >
              Save
            </button>
          }

          <button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </p>
      </form>
    </div>
  );
}

export default StudentForm;