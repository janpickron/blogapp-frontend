import { useState } from "react";
import Button from 'react-bootstrap/Button'

const SignUp = () => {
  const [form, setForm] = useState();

  // Adding new user
  const handleAddUser = (e) => {
    // stop refreshing browser
    e.preventDefault()

    // checking to see if there is no empty input
    if (!form.email || !form.password) {
        window.confirm("Please enter the field")
        return // do not proceed with the POST method request
    }

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/add-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(data => { 
          if (data) localStorage.getItem({User: JSON.stringify(data)})
    })
    .catch(error => console.error(error))
  }

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
              <td><label for="email">Email: </label></td>
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
              <td><label for="password">Password: </label></td>
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
