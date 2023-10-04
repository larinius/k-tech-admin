/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import store from '@/store';
import { deffHttp } from '@/utils/axios';
import type { Post } from '@/interfaces/postInterface';

const initialState: {
  data: Post | null;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
} = {
  data: null,
  error: null,
  status: 'idle',
};

export const createPostAsync = createAsyncThunk('posts/createPost', async (formData: FormData) => {
  const state = store.getState();
  const jwtToken = state.user.userInfo?.token;

  if (!jwtToken) {
    throw new Error('JWT token is missing.');
  }

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${jwtToken}`,
  };

  const response = await deffHttp.post<Post>(
    {
      url: `${import.meta.env.VITE_APP_API_BASE}/post`,
      data: formData,
      headers,
    },
    { errorMessageMode: 'modal', withToken: true },
  );

  return response;
});

export const updatePostAsync = createAsyncThunk(
  'posts/updatePost',
  async ({ formData, postId }: { formData: FormData; postId: number }) => {
    const state = store.getState();
    const jwtToken = state.user.userInfo?.token;

    if (!jwtToken) {
      throw new Error('JWT token is missing.');
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwtToken}`,
    };

    const response = await deffHttp.put<Post>(
      {
        url: `${import.meta.env.VITE_APP_API_BASE}/post/${postId}`,
        data: formData,
        headers,
      },
      { errorMessageMode: 'modal', withToken: true },
    );

    return response;
  },
);

export const deletePostAsync = createAsyncThunk('posts/deletePost', async (postId: number) => {
  const state = store.getState();
  const jwtToken = state.user.userInfo?.token;

  if (!jwtToken) {
    throw new Error('JWT token is missing.');
  }

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const response = await deffHttp.delete<Post>(
    {
      url: `${import.meta.env.VITE_APP_API_BASE}/post/${postId}`,
      headers,
    },
    { errorMessageMode: 'modal', withToken: true },
  );

  return response;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
      })
      .addCase(updatePostAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred during post update.';
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deletePostAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred during post deletion.';
      });
  },
});

export default postsSlice.reducer;
