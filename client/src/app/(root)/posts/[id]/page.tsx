"use client";
import BackButton from "@/components/BackButton";
import Post from "@/components/Post";
import { usePost } from "@/hooks/usePost";
import { useParams } from "next/navigation";

function PostPage() {
  const { id } = useParams();
  const { post, isLoading } = usePost(id as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-2 py-4">
        <BackButton navigateTo="/home" />
        <span className="text-xl font-semibold">Post</span>
      </div>
      {post && <Post post={post} />}
    </div>
  );
}

export default PostPage;
