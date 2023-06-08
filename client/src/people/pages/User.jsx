import UserList from "../components/UsersList";

const User = () => {
  const USER = [
    {
      id: "u1",
      name: "Mia Schzwegar",
      places: 3,
      image: "https://pic.onlinewebfonts.com/svg/img_569204.png",
    },
  ];
  return <UserList items={USER} />;
};
export default User;
