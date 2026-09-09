import { useSelector, useDispatch } from "react-redux";
import { addPost, removePost, fetchPosts } from "./features/posts/postsSlice";
import { useEffect } from "react";
import Post from "./features/posts/Post";

function App() {
  const posts = useSelector((state) => state.posts.posts);

  const loading = useSelector((state) => state.posts.loading);

  const error = useSelector((state) => state.posts.error);

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

      {error && <p>{error}</p>}

      {loading
        ? "Loading Post"
        : posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              handleRemovePost={handleRemovePost}
            ></Post>
          ))}
    </div>
  );
}

export default App;
