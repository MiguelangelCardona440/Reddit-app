import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostById, fetchCommentsById } from "./postsSlice";

////////////

function PostDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPostById(params.id));
    dispatch(fetchCommentsById(params.id));
  }, [dispatch, params.id]);

  if (loading) {
    return <p>Loadind post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Post Details</h1>
      {selectedPost && (
        <>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
        </>
      )}

      <p> post ID: {params.id}</p>

      <button>
        <Link to="/">← Back to Posts</Link>
      </button>
    </div>
  );
}

export default PostDetails;
