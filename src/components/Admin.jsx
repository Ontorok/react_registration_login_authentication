import React from "react";
import { Link } from "react-router-dom";
import Employees from "./Employees";

export const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <br />
      <Employees />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
