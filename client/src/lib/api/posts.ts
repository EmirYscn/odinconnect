import { api } from "./axios";
import type { Post } from "@shared/types/types";

export const getForYouPosts = async (): Promise<Post[]> => {
  const response = await api.get("/posts/foryou");
  return response.data;
};

export const getFollowingPosts = async (): Promise<Post[]> => {
  const response = await api.get("/posts/following");
  return response.data;
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  const response = await api.get(`/posts/user/${userId}`);
  return response.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export type PostPayload = {
  content?: string;
  mediaIds?: string[];
};

export const createPost = async (body: PostPayload): Promise<Post> => {
  const response = await api.post("/posts", body);
  return response.data.post;
};
