import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

// import useAuth hook from App.js
const LogIn = () => {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  // use useAuth hook to access authentication context
  const auth = useAuth();

  const handleLogIn = (e) => {
    // stop refreshing browser
    e.preventDefault();

    // checking to make sure there is no empty field
    if (!form.email || !form.password) {
      window.confirm("Please enter your email or password");
      return; // do not proceed without input
    }

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data 1 -> ", data === true);
        if (data.isAuthenticated) {
          console.log("User credentials is FOUND.");
          // use login function from authentication context
          auth.login(data);
          // localStorage.setItem("User", JSON.stringify(data));
          setMessage("User logging in");
          navigate("/");
        } else {
          console.log("data 2 -> ", data === true);
          setMessage(data.error);
          navigate("/login");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container mx-auto">
        <h1>Log In</h1>
        <form className="form">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="email">Email: </label>
                </td>
                <td>
                  <input
                    required
                    type="email"
                    pattern=".+@globex\.com"
                    size={30}
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    onChange={(e) => handleForm(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password">Password: </label>
                </td>
                <td>
                  <input
                    required
                    type="password"
                    size={40}
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => handleForm(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p></p>
          <div className="btn btn-primary">
            <Button onClick={handleLogIn}>Submit</Button>
          </div>
          <br />
          <br />
          <p>{message}</p>
        </form>
      </div>
    </>
  );
};
export default LogIn;
