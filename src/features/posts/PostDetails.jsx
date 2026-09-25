import { useParams } from "react-router-dom";

function PostDetails() {
  const params = useParams();

  return (
    <div>
      <h1>Post Details </h1>
      <p> post ID: {params.id}</p>
    </div>
  );
}

export default PostDetails;
