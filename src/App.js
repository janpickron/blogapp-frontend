import { useEffect, useState } from "react";
import "./App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home'
import AddPost from './pages/AddPost'


import { CardGroup, Card, Spinner, Button } from "react-bootstrap";

// import { Home } from "./Home.js";
// import { Page1 } from "./Components/page1";
// import { BrowserRouter as Routes, Route } from "react-router-dom";

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
    fetch("http://localhost:4040/")
      // get response and convert to JSON
      .then((apiResponse) => apiResponse.json())
      .then((cleanJson) => setMenuItems(cleanJson))
      .catch((myError) => console.log(myError));
  }, [menuItems]);

  // GET data from menuItems array
  const handleGetMenuItems = (e) => {
    e.preventDefault();
    // GET data - fetch in local API
    fetch("http://localhost:4040/")
      .then((apiResponse) => apiResponse.json())
      .then((cleanJson) => setMenuItems(cleanJson))
      .catch((myError) => console.log(myError));
    console.log("Fetching collection post to get data:", form);
    // clear all input field values
    setForm({
      title: "",
      content: "",
      date: "",
    });
  };
  // Adding new post
  const handleAddMenuItem = (e) => {
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
      .then((newMenuItem) => {
        // Update the menuItems state with the new menu item
        setMenuItems((prevItems) => [...prevItems, newMenuItem]);
      })
      .catch((error) => console.log(error));
    console.log("Fetching collection post to add data:", form);
    setForm({
      title: "",
      content: "",
      date: "",
    });
  };

  const handleUpdateMenuItem = (e) => {
    // stop from refreshing browser
    e.preventDefault();
    // Checking to see if there is no empty data or input
    if (!form.title || !form.content || !form.date) {
      console.log("Form fields cannot be empty");
      window.confirm(
        "Cannot leave the field empty. Please select the title to update."
      );
      return; // Don't proceed with the PUT request
    }
    fetch(`http://localhost:4040/?title=${itemToUpdate}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((myError) => console.log(myError));
    console.log("Fetching collection post to update data:", form);
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
      fetch(`http://localhost:4040/?title=${itemToUpdate}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setMenuItems(data))
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

  const handleTitleClick = (clickedItem) => {
    setItemToUpdate(clickedItem.title);
    setForm({
      title: clickedItem.title,
      content: clickedItem.content,
      date: clickedItem.date,
    });
  };

  return (
    // <>
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/page1" element={<Page1 />} />

    // </Routes>
    // </>

    <div className="App">
      <h1>full stack blog app</h1>
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
        multiline
        maxRows={4}
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
      <br /> <br />
      <Button variant="outline-info" size="small" onClick={handleGetMenuItems}>
        Get post
      </Button>
      <Button variant="outline-info" size="small" onClick={handleAddMenuItem}>
        Add post
      </Button>
      <Button
        variant="outline-info"
        size="small"
        onClick={handleUpdateMenuItem}
      >
        Update post
      </Button>
      <Button
        variant="outline-info"
        size="small"
        onClick={handleDeleteMenuItem}
      >
        Delete post
      </Button>
      <br />
      <p className="note">
        (click on title to display, update, or delete a post)
      </p>
      {/* <p>Item clicked with {itemToUpdate}</p> */}
      <CardGroup>
        {menuItems.length ? (
          menuItems.map((item, index) => {
            return (
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>
                    <span
                      className="hidden"
                      key={index}
                      onClick={() => handleTitleClick(item)}
                    >
                      <b>{item.title}</b>
                    </span>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.date}
                  </Card.Subtitle>
                  <Card.Text>{item.content}</Card.Text>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Spinner animation="border" />
        )}
      </CardGroup>
      {/* ___________________________ */}
      {/* ___________________________ */}
    </div>
  );
}
