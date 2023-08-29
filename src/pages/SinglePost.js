import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SinglePost = () => {
  const location = useLocation();
  const { title, content, date } = location.state;
  const [form, setForm] = useState({title: title, content: content, date:date });
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  // set new loading state variable = false

  const handleUpdatePost = (e) => {
    // set loading variable to = true
    e.preventDefault();
    console.log("sending to API for updating post");

    // Checking to see if there is no empty data or input
    if (!form.title || !form.content || !form.date) {
      console.log("Form fields cannot be empty");
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
      //    .then((data) => setMenuItems(data))
      .then(() => navigate("/"))
      .catch((myError) => console.log(myError));
    console.log("Fetching collection post to update data:", form);

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
        // .then((data) => setMenuItems(data))
        .then(() => navigate("/"))
        .catch((myError) => console.log(myError));
        
      console.log("Fetching collection post to delete data:", form);
      // clear all input field values
      setForm({
        title: "",
        content: "",
        date: "",
      });
     
    } else {
      console.log("Deletion canceled by user");
    }
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="home_all_posts_container">
      
      {/* <h1>{title}</h1>
      <h4>{date}</h4>
      <p>{content}</p> */}
 <h2>Update / Delete Post Item</h2>
      {showForm || (
        <form className="form">
         
          <p></p>
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
          Title:
          <input
            required
            type="text"
            name="title"
            value={form.title}
            placeholder="Title"
            onChange={(e) => handleForm(e)}
          />
          <br/>
          Content:
          <input
            required
            type="text"
            multiline
            maxRows={4}
            value={form.content}
            name="content"
            placeholder="Type the content here"
            onChange={(e) => handleForm(e)}
          />
          <br></br>
          {/* // if loading true  then show spinner */}
          <button onClick={handleUpdatePost}>Update post</button>
        </form>
      )}
      <button onClick={handleDeletePost}>Delete Post</button>
      <button onClick={() => setShowForm(!showForm)}>Show Post Form</button>
    </div>
  );
};
export default SinglePost;
