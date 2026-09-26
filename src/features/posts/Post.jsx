import { useDispatch } from "react-redux";
import { removePost } from "./postsSlice";

///////////

function Post({ post }) {
  const dispatch = useDispatch();

  const handleRemovePost = () => {
    dispatch(removePost(post.id));
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>User number: {post.userId}</p>
      <button onClick={() => handleRemovePost(post.id)}>Delete Post</button>
    </div>
  );
}

export default Post;
