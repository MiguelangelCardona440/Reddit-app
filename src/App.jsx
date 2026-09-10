import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./features/posts/postsSlice";
import { useState, useEffect } from "react";
import Post from "./features/posts/Post";

function App() {
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Post"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <h1>Reddit App</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredPosts.length === 0 ? (
        <p>No Post Found</p>
      ) : (
        filteredPosts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}

export default App;
