"use client";

import FeedTab from "@/components/FeedTab";
import PostInput from "@/components/PostInput";
import Posts from "@/components/Posts";
import { useSocketPostEvents } from "@/hooks/sockets/useSocketPostEvents";

function Feed() {
  useSocketPostEvents();

  return (
    <div className="flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4">
      <FeedTab />
      <PostInput />
      <Posts />
    </div>
  );
}

export default Feed;
