import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({});
  const [itemToUpdate, setItemToUpdate] = useState("");

  useEffect(() => {
    // fetch in local API
    fetch("http://localhost:4040/menu")
      // get response and convert to JSON
      .then((apiResponse) => apiResponse.json())
      .then((cleanJson) => setMenuItems(cleanJson))
      .catch((myError) => console.log(myError));
  }, [menuItems]);

  const handleAddMenuItem = (e) => {
    // stop from refreshing browser
    e.preventDefault();

    //const form = {title: title, description: description}

    fetch("http://localhost:4040/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((myError) => console.log(myError));
      console.log('Passed the Add part')
  };

  return (
    <div className="App">
      <h1>Menu items</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button onClick={handleAddMenuItem}>Add</button>
      <p>Item clicked with {itemToUpdate}</p>
      <ul>
        {menuItems.map((item) => {
          return (
            <li onClick={() => setItemToUpdate(item.title)}> {item.title}</li>
          );
        })}
      </ul>
    </div>
  );
}
