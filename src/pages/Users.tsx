import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState<string>();

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
          // Extracting the username before the "@" symbol
          const username = user.email.split("@")[0];

          return (
            <a
              className="bg-jjjBlue hover:bg-[#4e758a] text-jjjWhite p-4 text-xl font-normal text-center w-1/2 m-auto"
              href={`http://localhost:6969/usercollections/${user.id}`}
              key={user.id}
            >
              {username} {/* Displaying only the username */}
            </a>
          );
        })}
      </div>
    </h1>
  );
}
