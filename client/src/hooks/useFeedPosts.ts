import { getFeedPosts } from "@/lib/api/posts";
import { useQuery } from "@tanstack/react-query";

export const useFeedPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", "feed"],
    queryFn: getFeedPosts,
  });

  return {
    feedPosts: data,
    isLoading,
  };
};
