import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainNavigation from "./shared/components/MainNavigation";
import User from "./people/pages/User";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/components/UpdatePlace";
import Auth from "./people/pages/Auth";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#fffcfa]">
      <Router basename="/">
        <MainNavigation />
        <Routes>
          <Route path="/" Component={User} />
          <Route path="/:userId/places" Component={UserPlaces} />
          <Route path="/places/new" Component={NewPlace} />
          <Route path="/places/:placeId" Component={UpdatePlace} />
          <Route path="/auth" Component={Auth} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
