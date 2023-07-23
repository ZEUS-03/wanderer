import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Authcontext } from "./shared/context/auth-context";

import MainNavigation from "./shared/components/MainNavigation";
import User from "./people/pages/User";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/components/UpdatePlace";
import Auth from "./people/pages/Auth";

const App = () => {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={<Navigate to={"/auth"} />} />
      </Routes>
    );
  }

  return (
    <Authcontext.Provider
      value={{ isLoggedIn: isLoggedIn, logout: logout, login: login }}
    >
      <div className="bg-[#fffcfa]">
        <Router>
          <MainNavigation />
          {routes}
        </Router>
      </div>
    </Authcontext.Provider>
  );
};

export default App;
