import { useFeedPosts } from "@/hooks/useFeedPosts";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import { HiOutlineInbox } from "react-icons/hi2";

function Posts() {
  const { feedPosts, isLoading } = useFeedPosts();

  if (isLoading) {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  }
  return (
    <div className="w-full flex flex-col">
      {feedPosts && feedPosts.length > 0 ? (
        feedPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div className="flex flex-col items-center justify-center py-16 opacity-70">
          <HiOutlineInbox className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-500 mb-2">
            No posts yet
          </h2>
          <p className="text-gray-400 text-center max-w-xs">
            Looks like your feed is empty. Start by creating a new post or
            follow others to see their updates!
          </p>
        </div>
      )}
    </div>
  );
}

export default Posts;
