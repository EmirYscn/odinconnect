import { api } from "./axios";

type Post = { userId: number; id: number; title: string; body: string };

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get("/posts?limit=10");
  return response.data;
};
