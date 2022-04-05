/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../hooks/useAuth";

const LOGIN_URL = "/auth/login";
const Login = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("nasir");
  const [pwd, setPwd] = useState("pwd123");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ user, pwd });

    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const accessToken = res?.data?.data?.accessToken;
      const roles = res?.data?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err?.response?.status === 400) {
        setErrMsg("Missing Username or password");
      } else if (err?.response?.status === 401) {
        setErrMsg("Unautorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are Logged In</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offScreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account? <br />
            <span className="line">
              {/* put router link here */}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
