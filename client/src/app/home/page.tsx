"use client";

import { useSocketMessageEvents } from "@/hooks/sockets/useSocketMessageEvents";
import { useFeedPosts } from "@/hooks/useFeedPosts";

function Feed() {
  const { feedPosts, isLoading } = useFeedPosts();
  useSocketMessageEvents();

  if (isLoading) return <div>Loading...</div>;

  if (!feedPosts || feedPosts.length === 0) {
    return <p className="text-white">No posts available.</p>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ul className="list-disc list-inside">
        {feedPosts?.map((post) => (
          <li key={post.id} className="text-white">
            <p className="text-sm text-gray-600">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feed;
