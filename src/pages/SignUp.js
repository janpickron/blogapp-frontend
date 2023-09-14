import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState();
  const navigate = useNavigate()
  // Adding new user
  const handleAddUser = (e) => {
    // stop refreshing browser
    e.preventDefault();

    // checking to see if there is no empty input
    if (!form.email || !form.password) {
      window.confirm("Please enter email and / or password.");
      return; // do not proceed with the POST method request
    }

    // Sending data to API to add new user credentials
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/add-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        if (data) localStorage.getItem({ User: JSON.stringify(data) });
        navigate('/login')
      })
      .catch((error) => console.error(error));
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container mx-auto">
        <h1>Create Your Account</h1>
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
            <Button onClick={handleAddUser}>Sign Up</Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
