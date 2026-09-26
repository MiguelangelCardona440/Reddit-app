import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./features/posts/PostsSlice";
import { useState, useEffect } from "react";
import Post from "./features/posts/Post";
import SearchBar from "./features/posts/SearchBar";

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
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {searchTerm && (
        <p>
          Showing {filteredPosts.length} posts for {searchTerm}
        </p>
      )}

      <h1>Reddit App</h1>

      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredPosts.length === 0 ? (
        <p> No posts found for {searchTerm} </p>
      ) : (
        filteredPosts.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}

export default App;
