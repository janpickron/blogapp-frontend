import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    date: "",
  });
  const [itemToUpdate, setItemToUpdate] = useState("");

  useEffect(() => {
    // fetch in local API
    fetch("http://localhost:4040/post")
      // get response and convert to JSON
      .then((apiResponse) => apiResponse.json())
      .then((cleanJson) => setMenuItems(cleanJson))
      .catch((myError) => console.log(myError));
  }, [menuItems]);

  // GET data from menuItems array
  const handleGetMenuItems = (e) => {
    e.preventDefault();
    // GET data - fetch in local API
    fetch("http://localhost:4040/post")
      .then((apiResponse) => apiResponse.json())
      .then((cleanJson) => setMenuItems(cleanJson))
      .catch((myError) => console.log(myError));
  };
  // Adding new post
  const handleAddMenuItem = (e) => {
    // stop from refreshing browser
    e.preventDefault();
    
      // Checking to see if there is no empty data or input
  if (!form.title || !form.content || !form.date) {
    console.log("Form fields cannot be empty");
    window.confirm("Cannot leave the field empty")
    return; // Don't proceed with the POST request
  }
    fetch("http://localhost:4040/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((newMenuItem) => {
        // Update the menuItems state with the new menu item
        setMenuItems((prevItems) => [...prevItems, newMenuItem]);
      })
      .catch((error) => console.log(error));
    console.log("Fetching POST to add data:", form);
    setForm({
      title: "",
      content: "",
      date: "",
    });
  };

  const handleUpdateMenuItem = (e) => {
    // stop from refreshing browser
    e.preventDefault();
    fetch(`http://localhost:4040/post/?title=${itemToUpdate}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((myError) => console.log(myError));
    // clear all input field values
    setForm({
      title: "",
      content: "",
      date: "",
    });
  };
  // Delete function
  const handleDeleteMenuItem = (e) => {
    // stop from refreshing browser
    e.preventDefault();
    // Show the confirmation dialog to user
    const isConfirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirm) {
      fetch(`http://localhost:4040/post/?title=${itemToUpdate}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setMenuItems(data))
        .catch((myError) => console.log(myError));
    } else {
      console.log("Deletion canceled by user");
    }
  };

  return (
    <div className="App">
      <h1>Full Stack Blog App</h1>
      Title:{" "}
      <input
        required
        type="text"
        name="title"
        value={form.title}
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <br></br>
      Content:{" "}
      <input
        required
        type="text"
        value={form.content}
        name="content"
        placeholder="Type the content here"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <br></br>
      Date:
      <input
        required
        type="date"
        name="date"
        value={form.date}
        id="date"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <br></br>
      <button onClick={handleGetMenuItems}>Get post</button>
      <button onClick={handleAddMenuItem}>Add post</button>
      <button onClick={handleUpdateMenuItem}>Update menu item</button>
      <button onClick={handleDeleteMenuItem}>Delete menu item</button>
      <p>Item clicked with {itemToUpdate}</p>
      <br />Table Blog
      <table>
        <thead>
          <tr>
            <th id="date">Title</th>
            <th id="type">Content</th>
            <th id="amount">Date</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        {menuItems.map((item, index) => {
            return (
              <td key={index} onClick={() => setItemToUpdate(item.title)}>
             {" "}
              {item.title}
            </td>
            );
          })}
          </tr>
        </tbody>
      </table>
      <ul>
        {menuItems.map((item, index) => {
          return (
            <li key={index} onClick={() => setItemToUpdate(item.title)}>
              {" "}
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
