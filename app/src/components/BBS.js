import React, {useState, useEffect} from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import CategoryTab from './CategoryTab';

function BBS() {

  console.log("BBS Render");
  return (
    <div className="BBS">
      <CategoryTab />
    </div>
  );
}

export default BBS;