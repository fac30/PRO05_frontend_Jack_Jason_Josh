import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:5187/users");
    const myUsers = await response.json();
    console.log(myUsers);
    setUsers(myUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <h1>
      {users.map((user) => {
        return (
          <a href={`http://localhost:6969/usercollections/${user.id}`}>
            {user.email}
          </a>
        );
      })}
    </h1>
  );
}
