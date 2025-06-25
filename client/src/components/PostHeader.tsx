import { Post as PostType } from "@shared/types/types";
import ProfileImage from "./ProfileImage";

function PostHeader({ post }: { post: PostType }) {
  return (
    <div className="flex items-center gap-2">
      <ProfileImage size="sm" />
      <div className="flex flex-col">
        <span className="font-semibold">{post.user.username}</span>
        <span>Product Designer</span>
      </div>
    </div>
  );
}

export default PostHeader;
