import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

const SinglePost = () => {
  const location = useLocation();
  const { title, content, date } = location.state;
  const [form, setForm] = useState({
    title: title,
    content: content,
    date: date,
  });
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  // set new loading state variable = false
  const [loading, setLoading] = useState(false);
  
  const handleUpdatePost = (e) => {
    // set loading variable to = true
   setLoading(true)
    e.preventDefault();
    // Checking to see if there is no empty data or input
    if (!form.title || !form.content || !form.date) {
      window.confirm(
        "Cannot leave the field empty. Please select the title to update."
      );
      return; // Don't proceed with the PUT request
    }
    fetch(`http://localhost:4040/?title=${title}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => navigate("/"))
      .catch((myError) => console.log(myError));
    window.location.href = "/";
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    // Show the confirmation dialog to user
    const isConfirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirm) {
      fetch(`http://localhost:4040/?title=${title}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => navigate("/"))
        .catch((myError) => console.log(myError));
      // clear all input field values
      setForm({
        title: "",
        content: "",
        date: "",
      });
      window.location.href = "/";
    } else {
      console.log("Deletion canceled by user");
    }
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading)
  return (
    <Spinner animation="border" variant="primary" className="text-center">

    </Spinner>
)
  return (
    <div className="container mx-auto">
      <h1>Update / Delete Post</h1>
      {showForm || (
        <form className="form">
          <p></p>
          <table>
            <tr>
              <td>Date:</td>
              <td>
                {" "}
                <input
                  required
                  type="date"
                  name="date"
                  value={form.date}
                  id="date"
                  onChange={(e) => handleForm(e)}
                />
              </td>
            </tr>
            <p></p>
            <tr>
              <td>Title:</td>
              <td>
                <input
                  required
                  type="text"
                  size={40}
                  name="title"
                  value={form.title}
                  placeholder="Title"
                  onChange={(e) => handleForm(e)}
                />
              </td>
            </tr>
            <p></p>
            <tr>
              <td> Content:</td>
              <td>
                <input
                  required
                  type="text"
                  size={40}
                  value={form.content}
                  name="content"
                  placeholder="Type the content here"
                  onChange={(e) => handleForm(e)}
                />
              </td>
            </tr>
          </table>
          <br /> <br />
          {/* if loading true  then show spinner */}
       

          <Button className="btn-margin" onClick={handleUpdatePost}>
            Update post
          </Button>
          <Button className="btn-margin" onClick={handleDeletePost}>
            Delete Post
          </Button>
        </form>
      )}

      <Button className="btn-margin" onClick={() => setShowForm(!showForm)}>
        Show Post Form
      </Button>
    </div>
  );
};
export default SinglePost;
