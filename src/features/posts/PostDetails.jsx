import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostById } from "./postsSlice";

function PostDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const selectedPost = useSelector((state) => state.posts.selectedPost);

  useEffect(() => {
    dispatch(fetchPostById(params.id));
  }, [dispatch, params.id]);

  return (
    <div>
      {selectedPost && (
        <>
          {" "}
          <h2>{selectedPost.title}</h2> <p>{selectedPost.body}</p>{" "}
        </>
      )}
      <p> post ID: {params.id}</p>
    </div>
  );
}

export default PostDetails;
