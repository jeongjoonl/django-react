import React from 'react';

function StudentCreateForm({ currentCategory, onSubmit }) {
  function onSubmitClick(e) {
    e.preventDefault();

    const { name, age, gpa, category } = e.target;

    let newStudent = {
      name: name.value,
      age: age.value,
      gpa: gpa.value,
      category: category.value,
    }

    onSubmit(newStudent);
  }

  console.log("StudentCreateForm render");
  return (
    <div className="CreateStudent">
      <h1>Add Student</h1>
      <form
        action=""
        method="post"
        onSubmit={onSubmitClick}
      >
        <p>
          <input
            type="text"
            name="name"
            placeholder="Name"
          />
        </p>
        <p>
          <input
            type="number"
            name="age"
            placeholder="Age"
          />
        </p>
        <p>
          <input
            type="number"
            name="gpa"
            placeholder="GPA"
            step="0.1"
          />
        </p>

        <label>Choose a category: </label>
        <select
          name="category"
          defaultValue={currentCategory.toLocaleLowerCase()}
        >
          <option value="unknown">Unknown</option>
          <option value="person">Person</option>
          <option value="animal">Animal</option>
        </select>

        <p>
          <input
            type="submit"
            value="Add"
          />
        </p>
      </form>
    </div>
  );
}

export default StudentCreateForm;