import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const SinglePost = () => {
  const [form, setForm] = useState({});
  const [showForm, setShowForm] = useState(false);
  // set new loading state variable = false
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userLS = localStorage.getItem("User");

    if (userLS) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/single-post/${params.id}`)
      // get response and convert to JSON
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.log(err));
  }, [params.id]);

  const handleUpdatePost = (e) => {
    // set loading variable to = true
    setLoading(true);
    e.preventDefault();

    // Checking to see if there is no empty data or input
    if (!form.title || !form.content || !form.date) {
      // if (!form.title || !form.content || !form.date) {
      window.confirm(
        "Cannot leave the field empty. Please select the title to update."
      );
      console.log("cannot leave the fields empty");
      return; // Don't proceed with the PUT request
    }

    // Trim whitespace of title and content values
    const trimmedTitle = form.title.trim();
    const trimmedContent = form.content.trim();
    console.log("trimmed Title: ", trimmedTitle);
    console.log("trimmed Content:", trimmedContent);

    // new trimmed form with trimmed title and content
    const trimmedForm = {
      title: trimmedTitle,
      content: trimmedContent,
      date: form.date,
    };
    console.log("Complete trimmedForm: ", trimmedForm);
    console.log("It is working with form.title:", form.title);

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/single-post/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trimmedForm),
    })
      .then((res) => res.json())
      .then((data) => {
        // Log the response data
        console.log("Response Data:", data);
        navigate("/");
      })
      .catch((err) => console.error(err));
    console.log("after fetch:", trimmedForm);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    // Show the confirmation dialog to user
    const isConfirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirm) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/single-post/${params.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => navigate("/"))
        .catch((err) => console.error(err));
    } else {
      console.log("Deletion canceled by user");
    }
    window.location.href = "/";
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading)
    return (
      <div className="container mt-3 text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  return (
    <div className="container mx-auto">
      <h1>Update / Delete Post</h1>
      <img
        src={`https://source.unsplash.com/random?sig=${form.index}`}
        className="w-25 h-25 img-single-post"
        alt=""
      />
      <h3 className="show-date">Date: {form.date}</h3>
      <h1 className="show-title">Title: {form.title} </h1>
      <p className="show-content">Content: {form.content}</p>

      {loggedIn && (
        <>
          {showForm && (
            <form className="form">
              <table>
                <tbody>
                  <tr>
                    <td><label for="date">Date: </label></td>
                    <td>
                      <input
                        required
                        type="date"
                        name="date"
                        defaultValue={form.date}
                        id="date"
                        onChange={(e) => handleForm(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label for="title">Title: </label></td>
                    <td>
                      <input
                        required
                        type="text"
                        size={40}
                        name="title"
                        id="title"
                        defaultValue={form.title}
                        placeholder="Title"
                        onChange={(e) => handleForm(e)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label for="content">Content: </label></td>
                    <td>
                      <input
                        required
                        type="text"
                        size={40}
                        id="content"
                        defaultValue={form.content}
                        name="content"
                        placeholder="Type the content here"
                        onChange={(e) => handleForm(e)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <br /> <br />
              <Button className="btn-margin" onClick={handleUpdatePost}>
                Update post
              </Button>
            </form>
          )}
        </>
      )}

      {loggedIn && (
        <>
          <Button className="btn-margin" onClick={handleDeletePost}>
            Delete Post
          </Button>
          <Button className="btn-margin" onClick={() => setShowForm(!showForm)}>
            Show Post Form
          </Button>
        </>
      )}
    </div>
  );
};
export default SinglePost;
