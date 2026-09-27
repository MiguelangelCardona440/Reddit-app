import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  selectedPost: null,
  comments: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return data;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    const data = await response.json();
    return data;
  },
);

export const fetchCommentsById = createAsyncThunk(
  "posts/fetchCommentsById",
  async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );

    const data = await response.json();
    return data;
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    // fetch Posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch post bu Id
    builder.addCase(fetchPostById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.selectedPost = null;
    });

    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedPost = action.payload;
    });

    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // fetch comments by Id
    builder.addCase(fetchCommentsById.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });

    builder.addCase(fetchCommentsById.pending, (state) => {
      state.loading = true;
      state.comments = null;
      state.error = null;
    });

    builder.addCase(fetchCommentsById, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { addPost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
