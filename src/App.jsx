import { useSelector, useDispatch } from "react-redux";
import { addPost, removePost, fetchPosts } from "./features/posts/postsSlice";
import { useState, useEffect } from "react";

function App() {
  const { state, setState } = useState("");

  const posts = useSelector((state) => state.posts.posts);

  const loading = useSelector((state) => state.posts.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const testPost = {
    id: crypto.randomUUID(),
    title: "Cien Anos de Soledad",
    author: "Garcia Marquez",
  };

  const handleAddPost = () => {
    dispatch(addPost(testPost));
  };

  const handleRemovePost = (id) => {
    dispatch(removePost(id));
  };

  return (
    <div>
      <h1>Reddit App</h1>
      <button onClick={handleAddPost}> Add Test Post </button>

      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <button onClick={() => handleRemovePost(post.id)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
}

export default App;
