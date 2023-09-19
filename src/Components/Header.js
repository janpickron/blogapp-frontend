import React from "react";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import { useAuth } from "../App";

const Header = () => {
  // use the useAuth() hook to access authentication context
  const auth = useAuth();
  console.log(auth);

  // const [loggedIn, setLoggedIn] = useState(false)
  // useEffect(() => {
  //   const userLS = localStorage.getItem('User')
  //   if (userLS) {
  //     setLoggedIn(true)
  //   }
  // }, [])

  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* this will only show if loggedIn is true */}
        {auth.loggedIn && (
          <li>
            <Link to="/add-post">Add Post</Link>
          </li>
        )}

        {!auth.loggedIn && (
          <>
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/add-user">Add User</Link>
            </li>
          </>
        )}

        {auth.loggedIn && (
          <li>
            {/* <a href="/" onClick={() => localStorage.clear()}> */}
            <a
              href="/"
              onClick={() => {
                auth.logout();
                auth.setLoggedIn(false);
              }}
            >
              Logout
            </a>
          </li>
        )}
        <li className="header-text">full stack blog app</li>
      </ul>
    </header>
  );
};
export default Header;
