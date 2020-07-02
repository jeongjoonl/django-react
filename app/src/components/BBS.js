import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CategoryTab from './CategoryTab';
import Student from './Student';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

function BBS() {
  console.log("BBS Render");
  return (
    <div className="BBS">
      <CategoryTab />

      <Switch>
        <Route exact path="/" component={StudentList} />
        <Route exact path="/student/create" component={StudentForm} />
        <Route exact path="/student/edit" component={StudentForm} />
        <Route exact path="/:category/" component={StudentList} />
        <Route exact path="/:category/:id/" component={Student} />
        <Route path="/">
          Not Found
        </Route>
      </Switch>
    </div>
  );
}

export default BBS;