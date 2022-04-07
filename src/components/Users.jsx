import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/employees", {
          signal: controller.signal,
        });
        console.log(res.data);
        isMounted && setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
