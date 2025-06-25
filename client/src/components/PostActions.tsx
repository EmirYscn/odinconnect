import { BiCommentDetail } from "react-icons/bi";
import Button from "./Button";
import { RiShareForwardLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";

function PostActions() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Button
          icon={<FaHeart />}
          size="small"
          className="hover:text-red-500/80"
        />
        <span>12 Likes</span>
      </div>
      <div className="flex items-center">
        <Button icon={<BiCommentDetail />} size="small" />
        <span>25 Comments</span>
      </div>
      <div className="flex items-center gap-1">
        <Button icon={<RiShareForwardLine />} size="small" />
        <span>187 Share</span>
      </div>
    </div>
  );
}

export default PostActions;
