import React from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';

import CategoryTab from './CategoryTab';

import All from './All';
import Animal from './Animal';
import Person from './Person';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

function BBS() {
  function renderStudentList(category, props) {
    return <StudentList {...props} category={category} />
  }

  console.log("BBS Render");
  return (
    <div className="BBS">
      <CategoryTab />

      <Switch>
        <Route exact path="/" render={renderStudentList.bind(this, "")}/>
        <Route path="/person/" render={renderStudentList.bind(this, "person")} />
        <Route path="/animal/" render={renderStudentList.bind(this, "animal")} />
        <Route path="/student/create" component={StudentForm} />
        <Route path="/">
          Not Found
        </Route>
      </Switch>
    </div>
  );
}

export default BBS;