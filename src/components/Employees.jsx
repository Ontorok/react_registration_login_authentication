import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

const Employees = () => {
  const [users, setUsers] = useState([]);
  const privateAxiosInstance = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const res = await privateAxiosInstance.get("/employees", {
          signal: controller.signal,
        });
        console.log(res.data);
        isMounted && setUsers(res.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [location, navigate, privateAxiosInstance]);
  return (
    <article>
      <h2>Employee List List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{`${user?.firstName} ${user?.lastName}`}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Employees;
