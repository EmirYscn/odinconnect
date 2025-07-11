"use client";

import Feed from "@/app/(root)/home/components/Feed";
import FeedTab, { FeedTabContext } from "@/app/(root)/home/components/FeedTab";
import PostInput from "@/components/PostInput";
import { useSocketPostEvents } from "@/hooks/sockets/useSocketPostEvents";
import { useState } from "react";

function Home() {
  const [context, setContext] = useState<FeedTabContext>("foryou");
  useSocketPostEvents();

  return (
    <div className="flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] p-4">
      <FeedTab context={context} setContext={setContext} />
      <PostInput />
      <Feed context={context} />
    </div>
  );
}

export default Home;
