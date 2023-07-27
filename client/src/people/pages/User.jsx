import React, { useState, useEffect } from "react";
import UserList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ErrorModal from "../../shared/components/ErrorModal";

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    setIsLoading(true);
    const sendRequest = async () => {
      const response = await fetch("http://localhost:3000/api/users");
      try {
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUsers(responseData.users);
      } catch (e) {
        setError(e.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  // const USER = [
  //   {
  //     id: "u1",
  //     name: "Mia Schzwegar",
  //     places: 3,
  //     image: "https://pic.onlinewebfonts.com/svg/img_569204.png",
  //   },
  // ];
  return (
    <>
      {error && <ErrorModal message={error} onClose={errorHandler} />}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </>
  );
};
export default User;
