import React, { Component, useState } from 'react';
import './App.css';
import { render } from 'react-dom';

function Student({ data, onEdit, onDelete }) {

  function onEditClick(e) {
    e.preventDefault();
    onEdit();
  }

  function onDeleteClick(e) {
    e.preventDefault();
    onDelete();
  }

  console.log("Student render");
  return (
      <div className="Student">
        <h4>{data.name}</h4>
        <li>Age: {data.age}</li>
        <li>GPA: {data.gpa}</li>

        <input
          type="button"
          value="Edit"
          onClick={onEditClick}
        />

        <input
          type="button"
          value="Delete"
          onClick={onDeleteClick}
        />
      </div>
  );
}

function StudentCreateForm({ currentCategory, onSubmit }) {
  function onSubmitClick(e) {
    e.preventDefault();

    const {name, age, gpa, category} = e.target;
    
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

function BBS() {
  let mock_student_data = [
    {
      "id": 1,
      "name": "Bob",
      "age": 3,
      "gpa": 3.0,
      "category": "person",
    },
    {
      "id": 2,
      "name": "Moon",
      "age": 10,
      "gpa": 4.0,
      "category": "animal",
    },
    {
      "id": 3,
      "name": "Star",
      "age": 7,
      "gpa": 4.0,
      "category": "animal",
    },
    {
      "id": 10,
      "name": "Joon",
      "age": 27,
      "gpa": 0,
      "category": "person"
    },
    {
      "id": 11,
      "name": "Toto",
      "age": 5,
      "gpa": 4.0,
      "category": "animal",
    },
    {
      "id": 12,
      "name": "Lee",
      "age": 25,
      "gpa": 3.8,
      "category": "person",
    },
    {
      "id": 13,
      "name": "Dangdangee",
      "age": 3,
      "gpa": 2.5,
      "category": "animal",
    },
    {
      "id": 15,
      "name": "ET",
      "age": 9999999,
      "gpa": 9999999,
      "category": "unknow",
    },
  ]

  let maxID = 15;

  const [mode, setMode]              = useState("read");
  const [selectedID, setSelectedID]  = useState(0);
  const [category, setCategory]      = useState("all");
  const [studentList, setStudentList] = useState(mock_student_data);

  function onNavitateCatetory(newCategory) {
    setMode("read");
    setSelectedID(0);
    setCategory(newCategory);
  }
  
  function onViewStudent(id, e) {
    e.preventDefault();

    setMode("read");
    setSelectedID(id);
  }

  function onCreateClick() {
    setMode("create");
  }

  function renderStudentList() {
    let result = (<li>No Data</li>);
    let filteredStudentList = studentList;

    if (category !== "all") {
      filteredStudentList = studentList.filter(student => (
        student.category === category
      ));
    }

    if (filteredStudentList.length !== 0) {
      result = filteredStudentList.map(student => (
        <li key={student.id}>
          <a
            href="/"
            onClick={onViewStudent.bind(this, student.id)}
          >
            {student.name}
          </a>
        </li>
      ));
    }

    return result;
  }


  function getSelectedStudent() {
    return studentList.find(data => data.id === selectedID);
  }

  function onCreateStudent(newStudent) {
    maxID += 1;

    newStudent.id = maxID;

    setStudentList(studentList.concat(newStudent));
  }

  function onEditStudent() {
    setMode("edit");
  }

  function onSaveEditedStudent(name, age, gpa, category) {
    let modifiedStudentList = Array.from(studentList);

    for (let i = 0; i < modifiedStudentList.length; i++) {
      if (modifiedStudentList[i].id === selectedID) {
        modifiedStudentList[i].name = name;
        modifiedStudentList[i].age = age;
        modifiedStudentList[i].gpa = gpa;
        modifiedStudentList[i].category = category;
        break;
      }
    }

    setStudentList(modifiedStudentList);
    setMode("read");
  }

  function onCancelEditStudent() {
    setMode("read");
  }

  function onDeleteStudent() {
    let newStudentList = Array.from(studentList);

    for (let i = 0; i < newStudentList.length; i++) {
      if (newStudentList[i].id === selectedID)
      {
        newStudentList.splice(i, 1);
        break;
      }
    }

    setSelectedID(0);
    setStudentList(newStudentList);
  }


  console.log("BBS Render");
  return (
    <div className="BBS">

      <CategoryTab onChange={onNavitateCatetory}/>

      <h2>{category}</h2>

      <nav>
        <ul>
          {renderStudentList()}
        </ul>
      </nav>

      <input
        type="button"
        value="Create"
        onClick={onCreateClick}
      />

      {mode === "read"  &&
       selectedID !== 0 && (
        <Student
          data={getSelectedStudent()}
          onEdit={onEditStudent}
          onDelete={onDeleteStudent}
        />
      )}

      {mode === "create" && (
        <StudentCreateForm
          currentCategory={category}
          onSubmit={onCreateStudent}
        />
      )}

      {mode === "edit" && (
        <StudentEditForm
          data={getSelectedStudent()}
          onSave={onSaveEditedStudent}
          onCancel={onCancelEditStudent}
        />
      )}

    </div>
  );
}

function App() {
  console.log("App Render");
  return (
    <div className="App">
      <header>
        <h1>Django-React Demo</h1>
      </header>

      <BBS />
    </div>
  );
}

export default App;