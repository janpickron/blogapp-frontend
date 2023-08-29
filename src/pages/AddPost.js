import { useState } from "react";
import Button from "react-bootstrap/Button";

const AddPost = () => {
  // const [postItems, setPostItems] = useState([]);
  const [form, setForm] = useState({});

  // Adding new post
  const handleAddPost = (e) => {
    // stop from refreshing browser
    e.preventDefault();

    // Checking to see if there is no empty data or input
    if (!form.title || !form.content || !form.date) {
      console.log("Form fields cannot be empty");
      window.confirm("Cannot leave the field empty");
      return; // Don't proceed with the POST request
    }
    fetch("http://localhost:4040/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    console.log("Post sent to API");
    console.log("Fetching collection post to add data:", form);
    setForm({
      title: "",
      content: "",
      date: "",
    });
    window.location.href = "/";
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="home_all_posts_container">
      <h2>Add Post</h2>
      <form className="form">
        Date:
        <input
          required
          type="date"
          name="date"
          value={form.date}
          id="date"
          onChange={(e) => handleForm(e)}
        />
        <br />
        Title:{" "}
        <input
          required
          type="text"
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={(e) => handleForm(e)}
        />
        <br />
        Content: 
        <input
          required
          type="text"
          value={form.content}
          name="content"
          placeholder="Type the content here"
          onChange={(e) => handleForm(e)}
        />
        <br />
        <br />
        <Button onClick={handleAddPost}>Add post</Button>
      </form>
    </div>
  );
};
export default AddPost;
