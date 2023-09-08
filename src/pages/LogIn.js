import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

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
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          console.log("User credentials is FOUND.");
          localStorage.setItem("User", JSON.stringify(data));
          navigate("/");
        } else    
       {
        navigate("/add-user");
       }
           
      })
      
      .catch((error) => console.error(error));
    console.log("end of the loop");
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
              <td>Email: </td>
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
              <td>Password: </td>
              <td>
                <input
                  required
                  type="password"
                  size={40}
                  name="password"
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
      </form>
    </div>
    </>
  );
};
export default LogIn;
