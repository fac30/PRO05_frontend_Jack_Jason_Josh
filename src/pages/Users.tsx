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
      <div className="flex gap-10 text-center w-3/4 m-auto">
        {users.map((user) => {
          return (
            <a
              className="bg-jjjBlue text-jjjWhite p-4 text-xl font-normal text-center w-1/2 m-auto "
              href={`http://localhost:6969/usercollections/${user.id}`}
            >
              {user.email}
            </a>
          );
        })}
      </div>
    </h1>
  );
}
