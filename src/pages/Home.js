import { useState, useEffect } from "react";
import { PostCard } from "../Components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch in local API
    fetch("http://localhost:4040/")
      // get response and convert to JSON
      .then((apiResponse) => apiResponse.json())
      .then((cleanJson) => setPosts(cleanJson))
      .catch((myError) => console.log(myError));
  }, []);

  const allPosts = posts.map((post, index) => {
    return <PostCard key={post._id} post={post} index={index} />;
  });
  return (
    <div className="container mx-auto">
      <h3>All Posts</h3>
      <div className="d-flex flex-wrap">{allPosts}</div>
    </div>
  );
};
export default Home;