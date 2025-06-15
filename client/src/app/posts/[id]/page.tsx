"use client";
import { usePost } from "@/hooks/usePost";
import { useParams } from "next/navigation";

function Post() {
  const { id } = useParams();
  const { post, isLoading } = usePost(id as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{post?.content}</div>;
}

export default Post;
