import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: ""
  });
  const [itemToUpdate, setItemToUpdate] = useState("");

  useEffect(() => {
    // fetch in local API
    fetch("http://localhost:4040")
      // get response and convert to JSON
      .then((apiResponse) => apiResponse.json())
      .then((cleanJson) => setMenuItems(cleanJson))
      .catch((myError) => console.log(myError));
  }, [menuItems]);

  // GET data from menuItems array
  const handleGetMenuItems = (e) => {
    e.preventDefault();
    // GET data - fetch in local API
    fetch("http://localhost:4040/menu")
      .then((apiResponse) => apiResponse.json())
      .then((cleanJson) => setMenuItems(cleanJson))
      .catch((myError) => console.log(myError));
  };

  const handleAddMenuItem = (e) => {
    // stop from refreshing browser
    e.preventDefault();
 
    fetch("http://localhost:4040", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((myError) => console.log(myError));
    console.log("Passed the Add part");
    console.log(`Title : ${form.title}`)
    console.log(`Description : ${form.description}`)
   
    setForm({
      title: "",
      description: ""
    });

  }

  const handleUpdateMenuItem = (e) => {
    // stop from refreshing browser
    e.preventDefault()
    fetch(`http://localhost:4040/?title=${itemToUpdate}`,{
      method:'PUT',
      headers: {'Content-Type': 'application/json',
    },
      body: JSON.stringify(form),
    })
     .then(res => res.json())
     .then(data => setMenuItems(data))
     .catch(myError => console.log(myError))
// clear all input field values
     setForm({
      title: "",
      description: ""
    });
  }
// Delete function 
  const handleDeleteMenuItem = (e) => {
    // stop from refreshing browser
    e.preventDefault()

    fetch(`http://localhost:4040/?title=${itemToUpdate}`, {
      method:'DELETE',
      headers: {'Content-Type': 'application/json',
    },
    })
    .then(res => res.json())
    .then(data => setMenuItems(data))
    .catch(myError => console.log(myError))
// clear all input field values
    setForm({
      title: "",
      description: ""
    });
  }

  return (
    <div className="App">
      <h1>Menu items</h1>
      <input
        required
        type="text"
        name="title"
       value={form.title}
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        required
        type="text"
        value={form.description}
        name="description"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <br></br>
      <button onClick={handleGetMenuItems}>Get menu</button>
      <button onClick={handleAddMenuItem}>Add menu item</button>
      <br></br>
      <button onClick={handleUpdateMenuItem}>Update menu item</button>
      <button onClick={handleDeleteMenuItem}>Delete menu item</button>
      <p>Item clicked with {itemToUpdate}</p>
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