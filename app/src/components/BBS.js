import React from 'react';
import {Switch, Route} from 'react-router-dom';

import CategoryTab from './CategoryTab';
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
        <Route exact path="/" render={renderStudentList.bind(this, "all")}/>
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