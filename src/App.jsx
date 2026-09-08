import { useSelector, useDispatch } from "react-redux";
import { addPost, removePost } from "./features/posts/postsSlice";

function App() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

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
