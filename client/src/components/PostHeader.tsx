import { Post as PostType } from "@shared/types/types";
import PostDate from "./PostDate";
import { useRouter } from "next/navigation";

function PostHeader({ post }: { post: PostType }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <span
        className="font-semibold cursor-pointer hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/profile/${post.user.profile?.id}`);
        }}
      >
        {post.user.username}
      </span>
      <span className="font-semibold">·</span>
      <div>
        <PostDate date={post.createdAt} />
      </div>
    </div>
  );
}

export default PostHeader;
