import React, {useState} from 'react';

import CategoryTab from './CategoryTab';
import Student from './Student';
import StudentCreateForm from './StudentCreateForm';
import StudentEditForm from './StudentEditForm';
import StudentList from './StudentList';

function BBS() {
    let mock_student_data = [
    {
      "id": 1,
      "name": "Alpha",
      "age": 3,
      "gpa": 4.0,
      "category": "person",
    },
    {
      "id": 2,
      "name": "Beta",
      "age": 2,
      "gpa": 3.5,
      "category": "person",
    },
    {
      "id": 3,
      "name": "Moon",
      "age": 11,
      "gpa": 4.0,
      "category": "animal",
    },
    {
      "id": 4,
      "name": "Star",
      "age": 6,
      "gpa": 3.5,
      "category": "animal"
    },
    {
      "id": 5,
      "name": "Charlie",
      "age": 1,
      "gpa": 2.8,
      "category": "person",
    },
    {
      "id": 6,
      "name": "Toto",
      "age": 24,
      "gpa": 0.3,
      "category": "animal",
    },
    {
      "id": 7,
      "name": "Delta",
      "age": 11,
      "gpa": 0.8,
      "category": "person",
    },
  ]

  let maxID = 7;

  const [mode, setMode] = useState("read");
  const [selectedID, setSelectedID] = useState(0);
  const [category, setCategory] = useState("all");
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
      if (newStudentList[i].id === selectedID) {
        newStudentList.splice(i, 1);
        break;
      }
    }

    setSelectedID(0);
    setStudentList(newStudentList);
  }

  function getSelectedStudent() {
    return studentList.find(data => data.id === selectedID);
  }

  console.log("BBS Render");
  return (
    <div className="BBS">

      <CategoryTab onChange={onNavitateCatetory} />

      <h2>{category}</h2>

      <StudentList
        studentList={studentList}
        selectedCategory={category}
        onViewStudent={onViewStudent}
      />

      <input
        type="button"
        value="Create"
        onClick={onCreateClick}
      />

      {mode === "read" &&
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

export default BBS;