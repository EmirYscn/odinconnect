import { useFeedPosts } from "@/hooks/useFeedPosts";
import Posts from "../../../../components/Posts";

type FeedProps = {
  context: "foryou" | "following";
};

function Feed({ context }: FeedProps) {
  const { feedPosts, isLoading } = useFeedPosts(context);
  return <Posts posts={feedPosts} isLoading={isLoading} />;
}

export default Feed;
