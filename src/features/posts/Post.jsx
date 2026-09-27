import { useDispatch } from "react-redux";
import { removePost } from "./postsSlice";
import { Link } from "react-router-dom";

///////////

function Post({ post }) {
  const dispatch = useDispatch();

  const handleRemovePost = () => {
    dispatch(removePost(post.id));
  };

  return (
    <div>
      <h2>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p>{post.body}</p>
      <p>User number: {post.userId}</p>
      <button onClick={() => handleRemovePost(post.id)}>Delete Post</button>
    </div>
  );
}

export default Post;
