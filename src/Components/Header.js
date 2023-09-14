import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const userLS = localStorage.getItem('User')

    if (userLS) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
         {/* this will only show if loggedIn is true */}
        {loggedIn && ( 
        <li>
          <Link to="/add-post">Add Post</Link>
        </li>
        )}

        {!loggedIn && ( 
          <>
          <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/add-user">Add User</Link>
        </li>
          
          </>
        )}
        
        {loggedIn && (
          <li>
            <a href="/" onClick={() => localStorage.clear()}>
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
