import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AddPost = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  // Adding new post
  const handleAddPost = (e) => {
    // stop from refreshing browser
    e.preventDefault();

    // Checking to see if there is no empty data or input
    if (!form.title || !form.content || !form.date) {
      window.confirm("Cannot leave the field empty");
      return; // Don't proceed with the POST request
    }

    // Trim the title and content to remove whitespace from both side of string
    const trimmedTitle = form.title.trim();
    const trimmedContent = form.content.trim();

    const trimmedForm = {
      title: trimmedTitle,
      content: trimmedContent,
      date: form.date,
    };
    fetch(process.env.REACT_APP_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trimmedForm),
    })
      .then((res) => res.json())
      .then((data) => {
        // Log the response data
        console.log("Response Data:", data);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto">
      <h1>Add Post</h1>
      <form className="form">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="date">Date: </label>
              </td>
              <td>
                <input
                  required
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => handleForm(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="title">Title: </label>
              </td>
              <td>
                <input
                  required
                  type="text"
                  size={40}
                  id="title"
                  name="title"
                  placeholder="Title"
                  onChange={(e) => handleForm(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="content">Content: </label>
              </td>
              <td>
                <input
                  required
                  type="text"
                  size={40}
                  name="content"
                  id="content"
                  placeholder="Type the content here"
                  onChange={(e) => handleForm(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p></p>
        <div className="btn btn-primary">
          <Button onClick={handleAddPost}>Add post</Button>
        </div>
      </form>
    </div>
  );
};
export default AddPost;
