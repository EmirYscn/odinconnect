import { Post as PostType } from "@shared/types/types";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import { MediaWithSkeleton } from "./MediaWithSkeleton";
import { useState } from "react";
import Button from "./Button";
import { MAX_POST_CONTENT_LENGTH } from "@/lib/utils/constants";

function Post({ post }: { post: PostType }) {
  const [showFull, setShowFull] = useState(false);

  const isLong = post.content.length > MAX_POST_CONTENT_LENGTH;
  const displayedContent = showFull
    ? post.content
    : post.content.slice(0, MAX_POST_CONTENT_LENGTH);

  return (
    <div className="flex flex-col gap-4 p-8 rounded-2xl mt-2 shadow-sm bg-[var(--color-grey-50)]/20 border-r border-b border-[var(--color-grey-300)]/80 w-full">
      <PostHeader post={post} />
      <p className="break-words">
        {displayedContent}
        {!showFull && isLong && (
          <>
            {" "}
            <Button
              variation="text"
              onClick={() => setShowFull(true)}
              className="mt-1"
            >
              Show more
            </Button>
          </>
        )}
        {showFull && isLong && (
          <Button
            variation="text"
            onClick={() => setShowFull(false)}
            className="mt-1"
          >
            Show less
          </Button>
        )}
      </p>
      <div
        className={`grid gap-2 ${
          post?.medias?.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {post?.medias?.length > 0 &&
          post.medias.map((media) => (
            <MediaWithSkeleton key={media.id} src={media.url} />
          ))}
      </div>
      <PostActions />
    </div>
  );
}

export default Post;
