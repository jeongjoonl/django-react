import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function StudentList(props) {
  let params = useParams();

  const category = !params.category ? "all" : params.category;
  const[studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios
      .get("/student/")
      .then(response => setStudentList(response.data));
  }, []);


  function onCreate() {
    props.history.push("/student/create", {category: category});
  }

  function renderStudentList() {
    let result = (<li>No student</li>);
    let filteredStudentList = Array.from(studentList);

    if (category !== "all") {
      filteredStudentList = studentList.filter(student => student.category === category);
    }

    result = filteredStudentList.map(student => (
      <li key={student.id}>
        <Link to={"/student/" + student.id + "/"}>
          {student.name}
        </Link>
      </li>
    ));

    return result;
  }

  console.log("Render StudentList");
  return (
    <div>
      <h2>Student List: {category}</h2>

      <ul>
        {renderStudentList()}
      </ul>

      <button type="button" onClick={onCreate}>Add</button>
    </div>
  );
}

export default StudentList;