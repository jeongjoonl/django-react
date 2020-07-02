import React from 'react';
import axios from 'axios';

function StudentForm(props) {
  const data = props.location.state.data;
  let mode = data ? "edit" : "create";

  function onSubmit(e) {
    const form = e.target.form;

    const newData = {
      name: form.name.value,
      age: form.age.value,
      gpa: form.gpa.value,
      category: form.category.value,
    }

    if (mode === "create") {
      axios
        .post("/student/", newData)
        .then(response => props.history.replace("/student/" + response.data.id));
    } else {
      axios
        .put(`/student/${data.id}/`, newData)
        .then(response => props.history.replace(`/student/${response.data.id}`));
    }
  }

  function onCancel() {
    const redirectURL = data ? `/student/${data.id}/` : `/${props.location.state.category}/`;
    props.history.replace(redirectURL);
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
          defaultValue={data ? data.category : props.location.state.category}
          required
        >
          <option value="">Select</option>
          <option value="person">Person</option>
          <option value="animal">Animal</option>
        </select>

        <p>
          <button
            type="button"
            onClick={onSubmit}
          >
            {mode === "create" ? "Add" : "Save"}
          </button>

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