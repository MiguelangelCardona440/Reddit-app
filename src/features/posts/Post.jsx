function Post({ post, handleRemovePost }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <button onClick={() => handleRemovePost(post.id)}>Delete Post</button>
    </div>
  );
}

export default Post;
