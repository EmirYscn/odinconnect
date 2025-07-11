import { BiCommentDetail } from "react-icons/bi";
import Button from "./Button";
import { RiShareForwardLine } from "react-icons/ri";
import { FaHeart, FaRegBookmark } from "react-icons/fa";

function PostActions() {
  return (
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-1">
        <Button
          icon={<FaHeart />}
          size="small"
          className="hover:text-red-500/80 hover:animate-pulse"
        />
        <span>12</span>
      </div>
      <div className="flex items-center">
        <Button icon={<BiCommentDetail />} size="small" />
        <span>25</span>
      </div>
      <div className="flex items-center gap-1">
        <Button icon={<RiShareForwardLine />} size="small" />
        <span>187</span>
      </div>
      <div className="ml-auto">
        <Button icon={<FaRegBookmark />} size="small" />
      </div>
    </div>
  );
}

export default PostActions;
