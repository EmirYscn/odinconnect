"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import PostSkeleton from "@/components/PostSkeleton";

function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 4000); // Redirect after 4 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col px-4">
      <div className="w-full mb-8">
        <PostSkeleton
          texts={["Post Not Found", "Redirecting you to the home page..."]}
        />
      </div>
    </div>
  );
}

export default NotFound;
