import React from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';

import CategoryTab from './CategoryTab';

import All from './All';
import Animal from './Animal';
import Person from './Person';
import StudentForm from './StudentForm';

function BBS() {
  console.log("BBS Render");
  return (
    <div className="BBS">
      <CategoryTab />

      <Switch>
        <Route exact path="/" component={All} />
        <Route path="/person/" component={Person} />
        <Route path="/animal/" component={Animal} />
        <Route path="/student/create" component={StudentForm} />
        <Route path="/">
          Not Found
        </Route>
      </Switch>
    </div>
  );
}

export default BBS;