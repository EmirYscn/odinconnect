import { getUserPosts } from "@/lib/api/posts";
import { useQuery } from "@tanstack/react-query";

export const useUserPosts = (userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", "profile", userId],
    queryFn: async () => getUserPosts(userId),
    enabled: !!userId, // Only run the query if userId is defined
  });

  return {
    userPosts: data,
    isLoading,
  };
};
