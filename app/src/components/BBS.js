import React, {useState, useEffect} from 'react';
import axios from "axios";

import CategoryTab from './CategoryTab';
import Student from './Student';
import StudentCreateForm from './StudentCreateForm';
import StudentEditForm from './StudentEditForm';
import StudentList from './StudentList';

function BBS() {
  const [mode, setMode] = useState("read");
  const [selectedID, setSelectedID] = useState(0);
  const [category, setCategory] = useState("all");
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get("/student/")
      .then(response => setStudentList(response.data));
  }, []);

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
    axios
      .post("/student/", newStudent)
      .then(response => {
        if (response.status === 201) {
          setMode("read");

          setStudentList(studentList.concat(response.data));

          setSelectedID(response.data.id);
        }
      });
  }

  function onEditStudent() {
    setMode("edit");
  }

  function onSaveEditedStudent(name, age, gpa, category) {
    const editedData = {
      id: selectedID,
      name: name,
      age: age,
      gpa: gpa,
      category: category,
    }

    axios
      .put(`/student/${selectedID}/`, editedData)
      .then(() => {
        let modifiedStudentList = Array.from(studentList);

        for (let i = 0; i < modifiedStudentList.length; i++) {
          if (modifiedStudentList[i].id === editedData.id) {
            modifiedStudentList[i] = editedData;
            break;
          }
        }
        setStudentList(modifiedStudentList);
        setMode("read");
      })
      .catch(() => {
        alert("Couldn't Edit");
      });
  }

  function onCancelEditStudent() {
    setMode("read");
  }

  function onDeleteStudent() {
    if (window.confirm("Are you sure you want to remove the student from the list?")) {
      axios
        .delete(`/student/${selectedID}/`)
        .then(() => {
          let newStudentList = Array.from(studentList);

          for (let i = 0; i < newStudentList.length; i++) {
            if (newStudentList[i].id === selectedID) {
              newStudentList.splice(i, 1);
              break;
            }
          }

          setSelectedID(0);
          setStudentList(newStudentList);
        });
    }
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