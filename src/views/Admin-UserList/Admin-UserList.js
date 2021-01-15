import { useState, useEffect } from "react";
import Table from "../../components/UI/Table/Table";
import { getAlluser } from "../../services/UserServices";
import AppBarMur from "../../components/AppBar/AppBarMur";

const UserList = () => {
  const [rowstate, setRowState] = useState([]);
  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    const users = await getAlluser();

    const result = users.Users.map(({ nom, prenom, email, tel, _id }) => {
      return {
        id: _id,
        firstName: nom,
        lastName: prenom,
        email: email,
        tel: tel,
      };
    });
    setRowState(result);
  };

  return (
    <div>
      <AppBarMur />
      <Table rows={rowstate} />
    </div>
  );
};
export default UserList;
