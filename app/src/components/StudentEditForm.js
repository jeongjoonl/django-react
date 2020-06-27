import React from 'react';

function StudentEditForm({ data, onSave, onCancel }) {
  function onSubmitClick(e) {
    e.preventDefault();

    const { name, age, gpa, category } = e.target;
    onSave(name.value, age.value, gpa.value, category.value);
  }

  function onCancelClick(e) {
    e.preventDefault();
    onCancel("read");
  }

  return (
    <div className="StudentEditForm">
      <h4>Edit</h4>
      <form
        action=""
        method="put"
        onSubmit={onSubmitClick}
      >
        <p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={data.name}
          />
        </p>
        <p>
          <input
            type="number"
            name="age"
            placeholder="Age"
            defaultValue={data.age}
          />
        </p>
        <p>
          <input
            type="number"
            step="0.1"
            name="gpa"
            placeholder="GPA"
            defaultValue={data.gpa} />
        </p>

        <label>Choose a category: </label>
        <select
          name="category"
          defaultValue={data.category}
        >
          <option value="unknown">Unknown</option>
          <option value="person">Person</option>
          <option value="animal">Animal</option>
        </select>

        <p>
          <input
            type="submit"
            value="Edit"
          />
          <input
            type="button"
            value="Cancel"
            onClick={onCancelClick}
          />
        </p>
      </form>
    </div>
  );
}

export default StudentEditForm;