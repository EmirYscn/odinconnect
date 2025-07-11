"use client";
import BackButton from "@/components/BackButton";
import Post from "@/components/Post";
import PostSkeleton from "@/components/PostSkeleton";
import { usePost } from "@/hooks/usePost";
import { notFound, useParams } from "next/navigation";

function PostPage() {
  const { id } = useParams();
  const { post, isLoading, error } = usePost(id as string);

  if (error) return notFound();

  return (
    <div>
      <div className="flex items-center gap-2 py-4">
        <BackButton navigateTo="/home" />
        <span className="text-xl font-semibold">Post</span>
      </div>
      {post && !isLoading ? <Post post={post} /> : <PostSkeleton />}
    </div>
  );
}

export default PostPage;
