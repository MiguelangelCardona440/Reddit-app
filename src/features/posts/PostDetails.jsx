import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPostById, fetchCommentsById, addComment } from "./postsSlice";

////////////

function PostDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const comments = useSelector((state) => state.posts.comments);

  const [commentText, setCommentText] = useState("");

  // user comments
  const userComments = comments.map((comment) => {
    return (
      <div key={comment.id}>
        <h3>{comment.name}</h3>
        <p>{comment.body}</p>
        <p>
          {comment.createdAt ? new Date(comment.createdAt).toISOString() : ""}
        </p>
      </div>
    );
  });

  //
  const userCommentText = (event) => {
    setCommentText(event.target.value);
  };

  const submitComent = () => {
    if (commentText.trim().length === 0) {
      alert("We need your opinion");
      return;
    }

    const randomId = crypto.randomUUID();

    const newComment = {
      id: randomId,
      name: "you",
      body: commentText,
      createdAt: new Date().toISOString(),
    };

    dispatch(addComment(newComment));
    setCommentText("");
  };

  useEffect(() => {
    dispatch(fetchPostById(params.id));
    dispatch(fetchCommentsById(params.id));
  }, [dispatch, params.id]);

  if (loading) {
    return <p>Loading post...</p>;
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
      <br />
      <h2>Comments</h2>
      {comments.length === 0 ? <p>No comments yet</p> : userComments}
      <textarea value={commentText} onChange={userCommentText}></textarea>
      <br />
      <button onClick={submitComent}>Submit Comment</button>
      <br />
      <br />
      <br />
      <button>
        <Link to="/">← Back to Posts</Link>
      </button>
    </div>
  );
}

export default PostDetails;
